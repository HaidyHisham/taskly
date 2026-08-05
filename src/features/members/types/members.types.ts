export interface IMember {
  member_id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'viewer' | 'member' | 'admin';
  metadata: {
    sub: string;
    name: string;
    email: string;
    job_title: string;
    email_verified: boolean;
    phone_verified: boolean;
  };
  
}