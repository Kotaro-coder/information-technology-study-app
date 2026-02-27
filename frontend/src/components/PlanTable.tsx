import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Plan } from "../app/types/plan";
import EditPlan from "./EditPlan";
import DeletePlan from "./DeletePlan";
import { Stack } from "@mui/material";

export default function PlanTable({
  plans,
  userId,
}: {
  plans: Plan[] | undefined;
  userId: number | null;
}) {
  return (
    <TableContainer component={Paper} sx={{ width: "80%", m: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell align="right">Due Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans?.map((plan) => (
            <TableRow
              key={plan.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {plan.name}
              </TableCell>
              <TableCell align="right">{plan.dueDate}</TableCell>
              <TableCell align="right">{plan.status}</TableCell>
              <TableCell align="right">
                <Stack spacing={2} direction='row' justifyContent='flex-end'>
                  <EditPlan plan={plan} userId={userId} />
                  <DeletePlan id={plan.id} userId={userId}/>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
