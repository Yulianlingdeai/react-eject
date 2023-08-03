import React, { useState, ChangeEvent } from "react";
import "./index.css";
import icon_air from "../../assets/image/icon_air.png";
import icon_search from "../../assets/image/icon_search.png";

export default function SearchInput() {
    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [options] = useState(["Apple", "Banana", "Cherry", "Orange"]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        // 根据输入值动态过滤选项列表
        // const filteredOptions = options.filter((option) =>
        //     option.toLowerCase().includes(value.toLowerCase())
        // );
        // 更新选项列表
        // setOptions(filteredOptions);
        setShowDropdown(value.trim().length > 0); // 显示下拉框，当输入值非空时
    };
    const handleOptionSelect = (option: string) => {
        setInputValue(option);
        setShowDropdown(false); // 隐藏下拉框，当选择选项时
    };
    return (
        <div className="search-container">
            <div className="search-logo">
                <img src={icon_air} alt="" />
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                // onBlur={() => setShowDropdown(false)}
                placeholder="机场定位(模糊检索)"
            />
            {showDropdown && (
                <ul className="option-container">
                    {options
                        .filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((option, index) => (
                            <li
                                className={option === inputValue ? "active" : ""}
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                </ul>
            )}
            <img className="search-icon" src={icon_search} alt="" />
        </div>
    );
}
