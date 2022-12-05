/**
 * Represents a creation model
 */
export type CreationModel<
  T extends Partial<{ id: string; createdAt: Date; updatedAt: Date }>
> = Omit<T, "id" | "createdAt" | "updatedAt">;
