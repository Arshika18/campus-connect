/**
 * Generates a unique, standardized Campus Helpdesk Request ID
 * Example: REQ-2026-7842
 */
export function generateRequestId(): string {
  const currentYear = new Date().getFullYear();
  // 4 random uppercase alphanumeric characters or digits for easy readability and communication
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `REQ-${currentYear}-${randomSuffix}`;
}
