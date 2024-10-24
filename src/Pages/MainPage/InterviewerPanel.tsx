import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AssignTimeSlot, GetTimeSlot } from "../../Actions/TimeSlotAction";
import { start } from "repl";
import { GetInterview, RejectInterview } from "../../Actions/InterviewAction";

const array: Array<number> = [],
  days = ["", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
for (let i = 0; i < 25; i++) array[i] = i;

let day = new Date().getDay(),
  date = new Date().getDate();
for (let i = 1; i < 8; i++) {
  days[i] += date - day + i;
}

const selections: Array<Array<number>> = new Array(25);

for (let i = 0; i < 25; i++) {
  selections[i] = new Array();
  for (let j = 0; j < 8; j++) {
    selections[i].push(0);
  }
}
const titles: Array<Array<string>> = new Array(25);

for (let i = 0; i < 25; i++) {
  titles[i] = new Array();
  for (let j = 0; j < 8; j++) {
    titles[i].push("");
  }
}
export const InterviewerPanel = () => {
  const [startSel, setStartSel] = useState<{ row: number; col: number }>({
    row: -1,
    col: -1,
  });
  const [timeslots, setTimeSlots] =
    useState<
      Array<{ email: string; date: number; fromT: number; toT: number }>
    >();
  const [currentSel, setCurrentSel] = useState<{ row: number; col: number }>({
    row: -1,
    col: -1,
  });
  // const [selections, setSelections] = useState<Array<{row:number|undefined, startCol:number|undefined, endCol: number|undefined}>>([]);

  useEffect(() => {
    GetTimeSlot(localStorage.getItem("email") as string).then((res) => {
      setTimeSlots(res);
      const timeslots = res.rows;
      for (let i = 0; i < timeslots.length; i++) {
        let day = new Date().getDay(),
          date = new Date().getDate();
        const col = timeslots[i].date + day - date;
        if (col < 1) return;
        for (let j = timeslots[i].fromT; j < timeslots[i].toT; j++)
          selections[j][col] = 2;
      }
      GetInterview(localStorage.getItem("email") as string, "Interviewer").then(
        (res) => {
          const interviews = res.rows;
          for (let i = 0; i < interviews.length; i++) {
            selections[interviews[i].startt][
              (interviews[i].date % 7) + 1
            ] = 1;
            titles[interviews[i].startt][interviews[i].date % 7 + 1] =
              interviews[i].useremail + ": " + interviews[i].title;
          }
          setCurrentSel({ row: -1, col: -1 });
        }
      );
    });
  }, [startSel]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    if (e.buttons.toString() == "4") {
      console.log(
        col + date - (date % 7))
      RejectInterview(
        localStorage.getItem("email") as string,
        col + date - (date % 7) - 1,
        row
      )
        .then((res) => {
          setStartSel({ row, col });
          alert("Interview rejected!");
        })
        .catch((err) => console.log(err));
      return;
    }
    if (selections[row][col] == 1) {
      alert(
        `User Email: ${titles[row][col].split(":")[0]}\nInterview Title: ${
          titles[row][col].split(":")[1]
        }\n Interview date: ${col - day + date - (date % 7) + 6}\nStart time: ${
          row - 1
        }:00`
      );
      return;
    }
    if (row == 0 || col == 0) return;
    setStartSel({ row, col });
    setCurrentSel({ row, col });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    if (startSel.row != -1) setCurrentSel({ row, col });
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number
  ) => {
    if (startSel.row == -1) return;
    // setSelections([...selections, {row: startSel?.row, startCol: startSel?.col, endCol: startSel?.col}])
    for (let i = startSel.row; i <= currentSel.row; i++)
      selections[i][startSel.col] = 2;
    AssignTimeSlot(
      localStorage.getItem("email") as string,
      date - day + startSel.col,
      startSel.row - 1,
      currentSel.row
    );
    setStartSel({ row: -1, col: -1 });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eeeeee",
      }}
    >
      <Paper
        style={{
          width: "90%",
          height: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eeeeee",
        }}
      >
        <table style={{ width: "90%", height: "90%" }}>
          <tbody>
            {array.map((hour: number, index: number) => (
              <tr
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                {days.map((day: string, index1: number) => (
                  <td
                    style={{
                      width: 30,
                      height: 30,
                      border: "1px #eeeeee solid",
                      textAlign: "center",
                      flex: 1,
                      color:
                        selections &&
                        selections[index] &&
                        selections[index][index1] == 1
                          ? "white"
                          : "black",
                      background: (
                        (selections ? selections[index] : false)
                          ? selections[index][index1] == 1
                          : false
                      )
                        ? "#992222"
                        : selections[index][index1] == 2
                        ? "#6666ff"
                        : "#ffffff",
                    }}
                    onMouseDown={(e) => handleMouseDown(e, index, index1)}
                    onMouseMove={(e) => handleMouseMove(e, index, index1)}
                    onMouseUp={(e) => handleMouseUp(e, index, index1)}
                  >
                    {index == 0
                      ? days[index1]
                      : index1 == 0
                      ? `${array[index] - 1}:00-${array[index]}:00`
                      : titles && titles[index] && selections[index][index1] == 1
                      ? titles[index][index1]
                      : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </div>
  );
};
