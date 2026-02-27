"use client";

import { useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@apollo/client/react";
import { Stack, Typography } from "@mui/material";

import Header from "../components/Header";
import PlanTable from "../components/PlanTable";
import Loading from "../components/Loading";

import { Payload } from "./types/payload";
import { Plan } from "./types/plan";
import { GET_PLANS } from "../query/planQueries";
import AddPlan from "../components/AddPlan";

export default function Page() {
  // ✅ effect不要：初期化関数で一度だけ読む（ブラウザガード付き）
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  });

  const userId = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode<Payload>(token).sub;
    } catch {
      return null;
    }
  }, [token]);

  const { loading, data, error } = useQuery<{ getPlans: Plan[] }>(GET_PLANS, {
    variables: { userId: userId },
    skip: !userId,
    fetchPolicy: "network-only",
  });

  return (
    <>
      <Header />
      <Stack spacing={4} direction="column" m={8} alignItems="center">
        {!token && <Typography>ログイン情報を確認中...</Typography>}
        {loading && <Loading />}
        {error && <Typography color="red">エラーが発生しました</Typography>}
        {!loading && !error && (
          <>
            <AddPlan userId={userId} />
            <PlanTable plans={data?.getPlans} userId={userId} />
          </>
        )}
      </Stack>
    </>
  );
}
