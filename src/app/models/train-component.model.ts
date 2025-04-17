export interface TrainComponent {
  id: number;
  name: string;
  uniqueNumber: string;
  canAssignQty: boolean;
  quantity?: number;
}

export interface AssignQuantity {
  quantity: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}
