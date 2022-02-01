export type TypeOrNull<T> = T | null;

export type TypeOrUndefined<T> = T | undefined;

export type StringOrNull = TypeOrNull<string>;

export interface Child {
  childId: string;
  name: Name;
  birthday: StringOrNull;
  image: Image;
  checkedIn: boolean;
  checkinTime: StringOrNull;
  pickupTime: StringOrNull;
}

export interface Name {
  firstName: string;
  fullName: string;
  lastName: string;
  middleName?: string;
}

export interface Image {
  small: string;
  large: string;
  empty: boolean;
}

export interface GetChildrenResponse {
  children: Child[];
}

export interface GetChildrenParams {
  groupId: string;
  institutionId: string;
}
