import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { getCorrectAnswer } from "../../apis/analysisApi";
import { getUserStorage } from "../../apis/userStorageApi";
const userStorage = getUserStorage();
const accessToken = userStorage.accessToken;

// 더미 데이터 정의
const initialData = [
  {
    항목: "감정",
    우리애평균: 50,
    나이평균: 40,
    총평균: 50,
  },
  {
    항목: "인지",
    우리애평균: 50,
    나이평균: 60,
    총평균: 40,
  },
];

const MyResponsiveBar = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCorrectAnswer();
        if (
          response &&
          response.status === 200 &&
          response.result &&
          response.result.list
        ) {
          const transformedData = response.result.list.map((item) => ({
            항목: item.quizType === "FEELINGS" ? "감정" : "인지",
            우리애평균: item.correctRateMe,
            나이평균: item.correctRateAge,
            총평균: item.correctRateAll,
          }));
          setData(transformedData);
        }
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
        // 실패 시 더미 데이터 유지
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "90%" }}>
      <ResponsiveBar
        data={data}
        keys={["우리애평균", "나이평균", "총평균"]}
        indexBy="항목"
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        padding={0.1}
        groupMode="grouped"
        layout="horizontal"
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.8]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 2,
          tickRotation: 0,
          legend: "평균",
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "항목",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "row",
            justify: false,
            translateX: 0, // X축 이동 없음
            translateY: 60, // Y축으로 아래로 60 이동하여 그래프와의 간격 조정
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 30, // 축 틱 레이블의 글자 크기 조정
              },
            },
            legend: {
              text: {
                fontSize: 0, // 축 범례의 글자 크기 조정
              },
            },
          },
          legends: {
            text: {
              fontSize: 0, // 범례 글자 크기 조정
            },
          },
          labels: {
            text: {
              fontSize: 25, // 막대 내부 레이블의 글자 크기 조정
            },
          },
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => `${e.id}: ${e.value} in 항목: ${e.indexValue}`}
      />
    </div>
  );
};

export default MyResponsiveBar;
