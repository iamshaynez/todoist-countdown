import type { TodoistTask, CountdownCard, ApiResponse, CardType } from '../types';

const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';
const COUNTDOWN_FILTER = '@CountDown | @CountUp';

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
 * Calculate days left until due date (for CountDown)
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
 * Calculate days passed since start date (for CountUp)
 */
function calculateDaysPassed(startDate: string): number {
  const today = new Date();
  const start = new Date(startDate);
  
  // Reset time to start of day for accurate day calculation
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Extract date from description (first 10 characters in yyyy-MM-dd format)
 */
function extractDateFromDescription(description: string): { date: string; isValid: boolean } {
  if (!description || description.length < 10) {
    return { date: '', isValid: false };
  }
  
  const dateStr = description.substring(0, 10);
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!dateRegex.test(dateStr)) {
    return { date: dateStr, isValid: false };
  }
  
  // Validate if it's a real date
  const date = new Date(dateStr);
  const isValidDate = date instanceof Date && !isNaN(date.getTime()) && 
                     date.toISOString().split('T')[0] === dateStr;
  
  return { date: dateStr, isValid: isValidDate };
}

/**
 * Determine card type based on task labels
 */
function getCardType(labels: string[]): CardType {
  const hasCountUp = labels.some(label => label.toLowerCase().includes('countup'));
  return hasCountUp ? 'countup' : 'countdown';
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
    .map(task => {
      const cardType = getCardType(task.labels || []);
      
      if (cardType === 'countup') {
        // CountUp: use description date as start date
        const { date: descriptionDate, isValid } = extractDateFromDescription(task.description || '');
        
        if (!isValid) {
          // Return error card for invalid date format
          return {
            id: task.id,
            title: task.content,
            daysLeft: 0,
            dueDate: descriptionDate || 'Invalid Date',
            isOverdue: false,
            type: cardType,
            hasDateError: true,
          };
        }
        
        const daysPassed = calculateDaysPassed(descriptionDate);
        return {
          id: task.id,
          title: task.content,
          daysLeft: daysPassed,
          dueDate: descriptionDate,
          isOverdue: false,
          type: cardType,
          hasDateError: false,
        };
      } else {
        // CountDown: use due date
        if (!task.due?.date) {
          return null; // Skip tasks without due dates for countdown
        }
        
        const daysLeft = calculateDaysLeft(task.due.date);
        return {
          id: task.id,
          title: task.content,
          daysLeft,
          dueDate: formatDate(task.due.date),
          isOverdue: daysLeft < 0,
          type: cardType,
          hasDateError: false,
        };
      }
    })
    .filter((card): card is NonNullable<typeof card> => card !== null) // Remove null entries
    .sort((a, b) => {
      // Sort CountDown by days left, CountUp by days passed (descending)
      if (a.type === 'countdown' && b.type === 'countdown') {
        return a.daysLeft - b.daysLeft;
      }
      if (a.type === 'countup' && b.type === 'countup') {
        return b.daysLeft - a.daysLeft; // Descending for countup
      }
      // Mixed types: countdown first
      return a.type === 'countdown' ? -1 : 1;
    });
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