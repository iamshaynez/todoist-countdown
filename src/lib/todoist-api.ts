import type { TodoistTask, CountdownCard, ApiResponse } from '../types';

const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';
const COUNTDOWN_FILTER = '@CountDown';

/**
 * Fetch tasks from Todoist API with @CountDown filter
 */
export async function fetchCountdownTasks(apiKey: string): Promise<ApiResponse<TodoistTask[]>> {
  try {
    const response = await fetch(`${TODOIST_API_BASE}/tasks?filter=${encodeURIComponent(COUNTDOWN_FILTER)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { error: 'Invalid API key. Please check your Todoist API key.' };
      }
      if (response.status === 403) {
        return { error: 'Access denied. Please check your API key permissions.' };
      }
      return { error: `Failed to fetch tasks: ${response.statusText}` };
    }

    const tasks: TodoistTask[] = await response.json();
    return { data: tasks };
  } catch (error) {
    console.error('Error fetching Todoist tasks:', error);
    return { error: 'Network error. Please check your internet connection.' };
  }
}

/**
 * Calculate days left until due date
 */
function calculateDaysLeft(dueDate: string): number {
  const today = new Date();
  const due = new Date(dueDate);
  
  // Reset time to start of day for accurate day calculation
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Format date for display (yyyy-MM-dd format)
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * Transform Todoist tasks to countdown cards
 */
export function transformTasksToCards(tasks: TodoistTask[]): CountdownCard[] {
  return tasks
    .filter(task => task.due?.date) // Only include tasks with due dates
    .map(task => {
      const daysLeft = calculateDaysLeft(task.due!.date);
      return {
        id: task.id,
        title: task.content,
        daysLeft,
        dueDate: formatDate(task.due!.date),
        isOverdue: daysLeft < 0,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by days left (ascending)
}

/**
 * Fetch and transform countdown tasks in one call
 */
export async function getCountdownCards(apiKey: string): Promise<ApiResponse<CountdownCard[]>> {
  const tasksResponse = await fetchCountdownTasks(apiKey);
  
  if (tasksResponse.error) {
    return { error: tasksResponse.error };
  }
  
  const cards = transformTasksToCards(tasksResponse.data!);
  return { data: cards };
}