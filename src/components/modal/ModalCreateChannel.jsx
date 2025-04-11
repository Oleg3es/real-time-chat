import React, { useEffect, useRef } from 'react'
import { useMemo } from 'react';
import classes from './ModalCreateChannel.module.css'
import avatarDefault from '../../assets/small-заглушка-ptifxd-1558426986313.png'
import InputIcon from '../input/InputIcon';

const ModalCreateChannel = ({
  modal,
  setModal,
  users,
  newChannelName,
  setNewChannelName,
  searchTerm,
  setSearchTerm,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedUsers,
  setSelectedUsers,
  selectedIcon,
  setSelectedIcon,
  createChannel
}) => {
  const rootClasses = [classes.modalCreateChannel];
  if (modal) {
    rootClasses.push(classes.active)
  }

  const dropdownRef = useRef(null);
  const inputRef = useRef();

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleInputFile = (e) => {
    setNewChannelName(e.target.value)
    inputRef.current.value = '';
  }

  const getSelectedUsersData = users.filter(user => selectedUsers.includes(user.id))

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={classes.modalCreateChannelContent} onClick={(e) => e.stopPropagation()}>
        <div className="form">
          <h2 className='from__title'>Создать новый канал</h2>
          <div className='form__info'>
            <InputIcon
              type='file'
              ref={inputRef}
              accept='image/*'
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
            <div className='form__info-container'>
              <input
                type="text"
                value={newChannelName}
                required
                onChange={handleInputFile}
                placeholder="Название канала"
                className='form__info-text'
              />
              <p className='form__info-text-description'>
                Введите название и при желании загрузите фотографию
              </p>
            </div>
          </div>
          <div className="form__user">
            <h3 className="form__user-title">
              Добавить участников
            </h3>

            <div className='form__user-search-container'>
              <input
                type="text"
                placeholder='Поиск пользователей...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                className='form__user-search'
              />
              <button
                className='form__user-search-toggle'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {isDropdownOpen ? '▲' : '▼'}
              </button>
            </div>

            <div className='form__user-dropdown-container' ref={dropdownRef}>
              {isDropdownOpen && (
                <div className="form__user-dropdown">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className='form__user-dropdown-item'
                      >
                        <input
                          type="checkbox"
                          id={`user-${user.id}`}
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className='form__user-dropdown-checkbox'
                        />
                        <label
                          htmlFor={`user-${user.id}`}
                          className='form__user-dropdown-info'>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            width="30"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = avatarDefault;
                            }}
                          />
                          {user.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="form__user-dropdown-no-results">
                      Пользователи не найдены
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={createChannel}
              className='form__user-add'
            >
              Создать канал
            </button>
            <div className="form__users-list">
              {getSelectedUsersData.map(user => (
                <div key={`selected-${user.id}`} className="form__users-item">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    width="30"
                    onError={(e) => { e.target.src = avatarDefault; }}
                  />
                  <span>{user.name}</span>
                  <button
                    onClick={() => toggleUserSelection(user.id)}
                    className="form__users-button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCreateChannel