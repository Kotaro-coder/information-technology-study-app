import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client/react";
import { DELETE_PLAN } from "../mutations/planMutations";
import { GET_PLANS } from "../query/planQueries";
import { useRouter } from "next/navigation";

const DeletePlan = ({ id, userId }: { id: number; userId: number | null }) => {
  const [deletePlan] = useMutation<{ deletePlan: number }>(DELETE_PLAN);
  const router = useRouter();
  const handleDeletePlan = async () => {
    try {
      await deletePlan({
        variables: { id },
        refetchQueries: [{ query: GET_PLANS, variables: { userId } }],
      });
      alert("プランが削除されました");
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        localStorage.removeItem("token");
        alert("トークンの有効期限が切れました。サインイン画面に遷移します。");
        router.push("/signin");
        return;
      }
      alert("プランの削除に失敗しました。");
    }
  };
  return (
    <div>
      <Tooltip title="削除">
        <IconButton onClick={handleDeletePlan}>
          <DeleteIcon color="action" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DeletePlan;
