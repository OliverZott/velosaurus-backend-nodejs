import { PaginationMetadata } from "./paginationMetadata";

export interface PagedResponse<T> {
    items: T[];
    metadata: PaginationMetadata
}