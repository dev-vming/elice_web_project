import { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Calender.css';
import { ko } from 'date-fns/esm/locale';

function Calender () {
      const [month, setMonth] = useState(new Date().getMonth());

    const handleMonthChange = (date) => {
        setMonth(date.getMonth());
      };

      return (
        <DatePicker
          locale={ko}
          dateFormat="yyyy-MM-dd"
          selected={date}
          onChange={(selectDate) => setDate(selectDate)}
          customInput={<Input />}
          onMonthChange={handleMonthChange}
          dayClassName={(d) =>
            d.getDate() === date.getDate()
              ? 'custom-day selected-day'
              : d.getMonth() === month
              ? 'custom-day'
              : 'custom-day gray-day'
          }
        />
      );
}

export default Calender;