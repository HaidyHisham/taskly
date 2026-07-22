import ResetForm from "../components/reset/ResetForm";
import AuthLayout from "@/layouts/AuthLayout";

export default function ResetPage() {
  return (
    <AuthLayout reset>
      <ResetForm />
    </AuthLayout>
  );
}