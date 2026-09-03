import { Subject, Assessment } from '../types';

export function calculateSubjectAverage(assessments: Assessment[]): {
  average: number | null;
  totalCompletedWeight: number;
  totalWeight: number;
  isComplete: boolean;
} {
  const gradedAssessments = assessments.filter(a => a.score !== null && a.score !== undefined);
  const totalWeight = assessments.reduce((acc, curr) => acc + (curr.weight || 1), 0);

  if (gradedAssessments.length === 0) {
    return { average: null, totalCompletedWeight: 0, totalWeight, isComplete: false };
  }

  const weightedSum = gradedAssessments.reduce((acc, curr) => acc + (curr.score! * (curr.weight || 1)), 0);
  const totalCompletedWeight = gradedAssessments.reduce((acc, curr) => acc + (curr.weight || 1), 0);
  const average = Number((weightedSum / totalCompletedWeight).toFixed(2));
  const isComplete = gradedAssessments.length === assessments.length && assessments.length > 0;

  return {
    average,
    totalCompletedWeight,
    totalWeight,
    isComplete
  };
}

export function calculateGradeNeeded(
  assessments: Assessment[],
  targetAverage: number = 7.0
): { needed: number | null; pendingAssessmentName: string | null; possible: boolean } {
  const pending = assessments.filter(a => a.score === null || a.score === undefined);
  if (pending.length === 0) {
    return { needed: null, pendingAssessmentName: null, possible: true };
  }

  // If there's 1 pending assessment, compute exact required score
  const totalWeight = assessments.reduce((acc, curr) => acc + (curr.weight || 1), 0);
  const graded = assessments.filter(a => a.score !== null && a.score !== undefined);
  const currentWeightedSum = graded.reduce((acc, curr) => acc + (curr.score! * (curr.weight || 1)), 0);

  const pendingWeight = pending.reduce((acc, curr) => acc + (curr.weight || 1), 0);
  // (currentWeightedSum + needed * pendingWeight) / totalWeight = targetAverage
  // needed * pendingWeight = (targetAverage * totalWeight) - currentWeightedSum
  const needed = (targetAverage * totalWeight - currentWeightedSum) / pendingWeight;
  const roundedNeeded = Math.max(0, Number(needed.toFixed(1)));

  return {
    needed: roundedNeeded,
    pendingAssessmentName: pending[0].name,
    possible: roundedNeeded <= 10.0
  };
}

export function calculateOverallStats(subjects: Subject[]) {
  let totalWeightedAverages = 0;
  let subjectsWithGradesCount = 0;
  let approvedCount = 0;
  let inProgressCount = 0;
  let criticalCount = 0; // needing > 8.5 to pass or high absences

  subjects.forEach(sub => {
    const { average, isComplete } = calculateSubjectAverage(sub.assessments);
    const absenceRatio = sub.absences / sub.maxAbsences;

    if (average !== null) {
      totalWeightedAverages += average;
      subjectsWithGradesCount++;
      if (isComplete && average >= sub.minPassingGrade) {
        approvedCount++;
      } else if (average < 5.0 || absenceRatio > 0.75) {
        criticalCount++;
      } else {
        inProgressCount++;
      }
    } else {
      inProgressCount++;
    }
  });

  const overallCR = subjectsWithGradesCount > 0
    ? Number((totalWeightedAverages / subjectsWithGradesCount).toFixed(2))
    : 0;

  return {
    overallCR,
    approvedCount,
    inProgressCount,
    criticalCount,
    totalSubjects: subjects.length
  };
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
