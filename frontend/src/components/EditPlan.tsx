"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Plan } from "../app/types/plan";
import { PlanStatus } from "../app/types/planStatus";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PLAN } from "../mutations/planMutations";
import { GET_PLANS } from "../query/planQueries";
import { useRouter } from "next/navigation";

export default function EditPlan({
  plan,
  userId,
}: {
  plan: Plan;
  userId: number | null;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(plan.name);
  const [dueDate, setDueDate] = useState(plan.dueDate);
  const [status, setStatus] = useState(plan.status);
  const [description, setDescription] = useState(plan.description);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidDueDate, setIsInvalidDueDate] = useState(false);
  const router = useRouter();
  const [updatePlan] = useMutation<{ updatePlan: Plan }>(UPDATE_PLAN);
  const resetState = () => {
    setName(plan.name);
    setDueDate(plan.dueDate);
    setStatus(plan.status);
    setDescription(plan.description);
    setIsInvalidName(false);
    setIsInvalidDueDate(false);
  };

  const handleEditPlan = async () => {
    let canEdit = true;

    if (name.length === 0) {
      canEdit = false;
      setIsInvalidName(true);
    } else {
      setIsInvalidDueDate(false);
    }

    if (!Date.parse(dueDate)) {
      canEdit = false;
      setIsInvalidDueDate(true);
    } else {
      setIsInvalidDueDate(false);
    }

    if (canEdit) {
      const updatePlanInput = {
        id: plan.id,
        name,
        dueDate,
        status,
        description,
      };
      try {
        await updatePlan({
          variables: {
            updatePlanInput,
          },
          refetchQueries: [{ query: GET_PLANS, variables: { userId } }],
        });
        resetState();
        setOpen(false);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          localStorage.removeItem("token");
          alert("トークンの有効期限が切れました。サインイン画面に遷移します。");
          router.push("/signin");
          return;
        }

        alert("プランの編集に失敗しました。");
      }
    }
  };
  const handleClickOpen = () => {
    resetState();
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="編集">
        <IconButton onClick={handleClickOpen}>
          <EditIcon color="action" />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Edit Plan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Plan Name"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={isInvalidName}
            helperText={isInvalidName && "プラン名を入力してください"}
          />
          <TextField
            autoFocus
            margin="normal"
            id="due-date"
            label="Due Date"
            placeholder="yyyy-mm-dd"
            fullWidth
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={isInvalidDueDate}
            helperText={isInvalidDueDate && "日付形式で入力してください"}
          />
          <FormControl fullWidth={true} margin="normal">
            <InputLabel id="plan-status-label">Status</InputLabel>
            <Select
              labelId="plan-status-label"
              id="plan-status"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as PlanStatus)}
            >
              <MenuItem value={"NOT_STARTED"}>Not Started</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"COMPLETED"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditPlan}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
