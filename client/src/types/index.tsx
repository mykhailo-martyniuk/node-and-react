export interface Group {
  id: string | number;
  name: string;
}

export interface GroupExtended extends Group {
  users: any[];
  description: string;
}

export interface ForCreatingGroup {
  name: string;
  description: string;
}

export interface User {
  id: string | number;
  user_name: string;
  email: string;
  created: string;
  groups: Group[];
}

export interface ForCreatingUser {
  userName: string;
  email: string;
  groups: string[];
}
