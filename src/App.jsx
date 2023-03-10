import React, { useCallback, useState } from "react";
import _ from "lodash";

function App() {
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  // 커스텀 디바운스 함수를 만들어서 써보자
  // 클로저 !!
  const debounce = (callback, delay) => {
    let timerId = null;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, [delay]);
    };
  };

  // lodash를 사용한 디바운싱 해줄 함수
  // useCallback 을 써서 디바운싱 해주는 함수를 메모이제이션 해주어야 함
  // const handleSearchText = useCallback(
  //   _.debounce((text) => {
  //     setSearchText(text);
  //   }, 2000),
  //   []
  // );

  // useCallback으로 메모이제이션을 해두었기 때문에,
  // 렌더링이 일어나서 다시 불러온다 할지라도 새롭게 함수가 리턴되는 게 아니라
  // 기억하고있기 때문에 저 똑같은 값을 참조하고 있음..
  // 디바운스나 쓰로틀링을 할 때에는 꼭 유즈콜백을 통해서 지켜주어야함.. 절대 지켜..
  const handleSearchText = useCallback(
    debounce((text) => {
      setSearchText(text);
    }, 2000),
    []
  );

  // 공통함수
  const handleChange = (e) => {
    setInputText(e.target.value);
    handleSearchText(e.target.value);
  };

  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <h1>디바운싱 예제</h1>
      <input
        type="text"
        placeholder="입력값을 넣고 디바운싱 테스트를 해보세요"
        style={{ width: "300px" }}
        onChange={handleChange}
      />
      <p>Search Text : {searchText}</p>
      <p>Input Text : {inputText}</p>
    </div>
  );
}

export default App;
