export class TimelineTripModel {
    id: number;
    time: string;
    color: string;
    title?: string;
    subtext?: string;
    link?: string;
}

export interface MemberData {
    fullName: string;
    urlAvatar: string;
  }
  
  export interface TripData {
    id: string;
    title: string;
    coverImage?: string;
    startDate: string;
    endDate: string;
    members: MemberData[];
  }