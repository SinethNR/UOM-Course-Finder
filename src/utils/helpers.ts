import { Course } from '../types';

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour24 = parseInt(hours, 10);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  
  return `${hour12}:${minutes} ${ampm}`;
};

export const formatSchedule = (course: Course): string => {
  if (!course.schedule || course.schedule.length === 0) {
    return 'Schedule not available';
  }
  
  return course.schedule
    .map(s => `${s.day} ${formatTime(s.startTime)}-${formatTime(s.endTime)}`)
    .join(', ');
};

export const getEnrollmentStatus = (course: Course): { status: string; color: string } => {
  const percentage = (course.enrollmentCount / course.maxCapacity) * 100;
  
  if (percentage >= 100) {
    return { status: 'Full', color: '#FF3B30' };
  } else if (percentage >= 90) {
    return { status: 'Almost Full', color: '#FF9500' };
  } else if (percentage >= 70) {
    return { status: 'Available', color: '#FF9500' };
  } else {
    return { status: 'Available', color: '#34C759' };
  }
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const filterCoursesByQuery = (courses: Course[], query: string): Course[] => {
  if (!query.trim()) return courses;
  
  const lowercaseQuery = query.toLowerCase();
  
  return courses.filter(course =>
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.instructor.toLowerCase().includes(lowercaseQuery) ||
    course.department.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const sortCourses = (courses: Course[], sortBy: 'title' | 'instructor' | 'credits' | 'enrollment'): Course[] => {
  return [...courses].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'instructor':
        return a.instructor.localeCompare(b.instructor);
      case 'credits':
        return b.credits - a.credits;
      case 'enrollment':
        return (b.enrollmentCount / b.maxCapacity) - (a.enrollmentCount / a.maxCapacity);
      default:
        return 0;
    }
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
