import React from 'react'
import { useState, } from 'react';

const MessageGroup = ({ channel }) => {
  console.log(channel.img.url)

  return (
      <div className="channel">
        <div className="channel__item">
          <div className="channel__item-icon">
            <img src={channel.img.url} alt="" />
          </div>
          <div className="channel__item-name">
            {channel.name}
          </div>
        </div>
        <div className="channel__last-message">

        </div>
      </div>
  )
}

export default MessageGroup