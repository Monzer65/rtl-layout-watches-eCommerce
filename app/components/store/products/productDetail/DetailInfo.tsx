"use client";
const DetailInfo = ({
  brand,
  model,
  caseDiameter,
  caseShape,
  caseMaterial,
  caseThickness,
  caseColor,
  bandMaterial,
  bandColor,
  dialColor,
  movement,
  waterResistance,
}: {
  brand: string | undefined;
  model: string | undefined;
  caseDiameter: number | undefined;
  caseShape: string | undefined;
  caseMaterial: string | undefined;
  caseThickness: number | undefined;
  caseColor: string | undefined;
  bandMaterial: string | undefined;
  bandColor: string | undefined;
  dialColor: string | undefined;
  movement: string | undefined;
  waterResistance: string | undefined;
}) => {
  return (
    <>
      <h3 className='font-bold text-2xl'>جزئیات</h3>
      <table className='w-full [&>tbody>tr>th]:text-start [&>tbody>tr>th]:p-2 [&>tbody>tr>td]:w-full [&>tbody>tr>th]:text-nowrap [&>tbody>tr>td]:p-2 [&>tbody>*:nth-child(odd)]:bg-gray-100'>
        <tbody>
          <tr>
            <th>برند</th>
            <td>{brand}</td>
          </tr>
          <tr>
            <th>مدل</th>
            <td>{model}</td>
          </tr>
          <tr>
            <th>عرض قاب</th>
            <td>{caseDiameter}</td>
          </tr>
          <tr>
            <th>شکل قاب</th>
            <td>{caseShape}</td>
          </tr>
          <tr>
            <th>جنس قاب</th>
            <td>{caseMaterial}</td>
          </tr>
          <tr>
            <th>ضخامت قاب</th>
            <td>{caseThickness}</td>
          </tr>
          <tr>
            <th>رنگ قاب</th>
            <td>
              {/* {caseColor} */}
              <div
                style={{
                  width: "30px",
                  height: "15px",
                  backgroundColor: caseColor,
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>
          <tr>
            <th>جنس بند</th>
            <td>{bandMaterial}</td>
          </tr>
          <tr>
            <th>رنگ بند</th>
            <td>
              {/* {bandColor}{" "} */}
              <div
                style={{
                  width: "30px",
                  height: "15px",
                  backgroundColor: bandColor,
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>
          <tr>
            <th>رنگ عقربه</th>
            <td>
              {/* {dialColor} */}
              <div
                style={{
                  width: "30px",
                  height: "15px",
                  backgroundColor: dialColor,
                  border: "1px solid #ccc",
                }}
              />
            </td>
          </tr>
          <tr>
            <th>محرکه</th>
            <td>{movement}</td>
          </tr>
          <tr>
            <th>مقاومت در برابر آب</th>
            <td>{waterResistance}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DetailInfo;
