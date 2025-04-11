import React, { useId, useState } from 'react'
import './InputIcon.scss'
import defaultImg from '../../assets/camera.png'

const InputIcon = ({ selectedIcon, setSelectedIcon, ...props }, ref) => {
    const id = useId();
    const [drag, setDrag] = useState(false);
    console.log(selectedIcon)

    function onDropHandler(e) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        console.log(file)
        setDrag(false)
        handleFileSelect(file);
    }

    function handleFileSelect(file) {
        if (!file.type.match('image.*')) {
            alert('Пожалуйста, выберите файл изображения');
            return;
        }
        setSelectedIcon(file)
    }

    function handleInputChange(e) {
        if (e.target.files[0]) handleFileSelect(e.target.files[0])
    }

    return (
        <div className='input-container'>
            <label
                htmlFor={id}
                onDrop={onDropHandler}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                className={`input-label drop-area ${drag ? 'drag-active' : ''}`}
            >
                <div className='input-preview'>
                    {selectedIcon ? (
                        <img
                            src={URL.createObjectURL(selectedIcon)}
                            alt=""
                        />
                    ) : (
                        <img src={defaultImg} alt="" />
                    )}
                </div>
            </label>
            <input
                id={id}
                ref={ref}
                {...props}
                onChange={handleInputChange}
                className='input-file'
            />
        </div>
    )
}

export default InputIcon