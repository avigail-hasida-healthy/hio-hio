/**
 * Represents a creation dto
 */
export type CreationDto<
  T extends Partial<{ id: string; createdAt: Date; updatedAt: Date }>
> = Omit<T, "id" | "createdAt" | "updatedAt">;
