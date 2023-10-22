import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";

const PeriodCalendar = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
   <> 
    <div>
    <DatePicker 
      placeholderText="년-월-일"    	
      isClearable
     selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={ko}                   // 한글로 변경
      dateFormat="yyyy년 MM월 dd일" // 시간 포맷 변경
      showPopperArrow= {true}   	// 화살표 변경
      maxDate={new Date()}    // 오늘 날짜 전은 선택 못하게
      startDate={startDate}
      endDate={endDate}
      customInput={		      // 날짜 뜨는 인풋 커스텀
        <Form.Control as="textarea"  rows={1} style={{width:"250px"}}/> 
      }
      />
      </div>

      <div>
      <DatePicker 
      placeholderText="년-월-일"    
      isClearable	
    	selected={endDate}
      onChange={(date) => setEndDate(date)}
      locale={ko}                   // 한글로 변경
      dateFormat="yyyy년 MM월 dd일" // 시간 포맷 변경
      showPopperArrow={true}  
      maxDate={new Date()}    // 오늘 날짜 전은 선택 못하게
      // 화살표 변경
      // minDate={ Date()}    // 오늘 날짜 전은 선택 못하게
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      customInput={		      // 날짜 뜨는 인풋 커스텀
        <Form.Control as="textarea"   rows={1} style={{width:"250px"}}/> 
      }
      />

      </div>
      </>
  );
};
export default PeriodCalendar;