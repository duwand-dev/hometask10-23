import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BarChart, BarSeriesType } from "@mui/x-charts";
import { GetAllInterviews } from "../../Actions/InterviewAction";
import { MakeOptional } from "@mui/x-charts/internals";
import { GetAllUsers } from "../../Actions/AuthAction";
import { count } from "console";
import UserTable from "./component/UserTable";

let day = new Date().getDay(),
  date = new Date().getDate();

const days = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
  dates: Array<number> = [];

for (let i = 0; i < 7; i++) dates.push(i + date - (date % 7));

export const SuperAdminPanel = () => {
  const [interviews, setInterviews] = useState<
    Array<{
      interviewerEmail: string;
      userEmail: string;
      date: number;
      startTime: number;
    }>
  >();
  const [countByDay, setCountByDay] = useState<Array<number>>([0, 0, 0]);
  const [interviewers, setInterviewers] = useState<Array<string>>([""]);
  const [countByInterviewers, setCountBYInterviewers] = useState<Array<number>>(
    [0]
  );
  const [normalusers, setNormalusers] = useState<Array<string>>([""]);
  const [countByNormalUsers, setCountByNormalUsers] = useState<Array<number>>([
    0,
  ]);
  const [countByInterviewer, setCountByInterviewer] = useState<Array<number>>([
    0, 0, 0,
  ]);

  useEffect(() => {
    GetAllInterviews()
      .then(async (res) => {
        setInterviews(res.rows);
        let temp: Array<number> = new Array(0);
        for (let i = 0; i < 7; i++) {
          temp.push(
            res.rows.filter(
              (
                val: {
                  intervieweremail: string;
                  useremail: string;
                  date: number;
                  startt: number;
                },
                index: number
              ) => val.date == i + date - (date % 7)
            ).length
          );
        }
        setCountByDay(temp);

        //by interviewers
        let users: Array<{
          email: string;
          password: string;
          usertype: string;
        }> = await GetAllUsers();
        let interviewers = users
          .filter(
            (user: { email: string; password: string; usertype: string }) =>
              user.usertype == "Interviewer         "
          )
          .map(
            (user: { email: string; password: string; usertype: string }) =>
              user.email
          );
        setInterviewers(interviewers);
        let countByInterviewers = interviewers.map((interviewer: string) => {
          return res.rows.filter(
            (
              val: {
                intervieweremail: string;
                useremail: string;
                date: number;
                startt: number;
              },
              index: number
            ) => interviewer == val.intervieweremail
          ).length;
        });
        setCountBYInterviewers(countByInterviewers);
        console.log(interviewers);
        let normalusers = users
          .filter(
            (user: { email: string; password: string; usertype: string }) =>
              user.usertype == "User                "
          )
          .map(
            (user: { email: string; password: string; usertype: string }) =>
              user.email
          );
        setNormalusers(normalusers);
        let countByNormalUsers = normalusers.map((normaluser: string) => {
          return res.rows.filter(
            (
              val: {
                intervieweremail: string;
                useremail: string;
                date: number;
                startt: number;
              },
              index: number
            ) => normaluser == val.useremail
          ).length;
        });
        setCountByNormalUsers(countByNormalUsers);
      })
      .catch((err) => console.log("err"));
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "200%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eeeeee",
      }}
    >
      <Paper
        style={{
          width: "90%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#eeeeee",
        }}
      >
        {/* [
            { data: [35, 44, 24] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ] */}
          <BarChart
            series={[{ data: countByDay }]}
            height={290}
            xAxis={[{ data: days, scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
          <BarChart
            series={[{ data: countByDay }]}
            height={290}
            xAxis={[{ data: dates, scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
          <BarChart
            series={[{ data: countByInterviewers }]}
            height={290}
            xAxis={[{ data: interviewers, scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
          <BarChart
            series={[{ data: countByNormalUsers }]}
            height={290}
            xAxis={[{ data: normalusers, scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        <UserTable />
      </Paper>
    </div>
  );
};
