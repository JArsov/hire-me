/**
 * Only the fields that are being used in the application are defined in the models
 */

export type TypeOrNull<T> = T | null;

export type TypeOrUndefined<T> = T | undefined;

export type StringOrNull = TypeOrNull<string>;

export interface Child {
  childId: string;
  name: Name;
  birthday: StringOrNull;
  image: Image;
  checkedIn: boolean;
}

export interface Name {
  fullName: string;
}

export interface Image {
  small: string;
}

export interface GetChildrenResponse {
  children: Child[];
}

export interface GetChildrenParams {
  groupId: string;
  institutionId: string;
}
