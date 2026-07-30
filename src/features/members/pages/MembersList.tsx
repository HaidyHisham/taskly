import type { IMember } from "../types/members.types";
import MemberDetails from "../components/MemberDetails";

const dummyMember: IMember = {
  member_id: "1",
  project_id: "proj-1",
  user_id: "user-1",
  role: "owner",
  metadata: {
    sub: "user-1",
    name: "Haidy Hesham",
    email: "haidy@example.com",
    job_title: "Frontend Developer",
    email_verified: true,
    phone_verified: false,
  },
};

const MembersList = () => {
    return (
        <section className="p-6">
           <MemberDetails member={dummyMember} />
        </section>
    );
};

export default MembersList;