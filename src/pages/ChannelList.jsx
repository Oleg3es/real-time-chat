import React, { useContext, useEffect, useState } from 'react'
import Container from '../components/Container'
import MessageGroup from '../components/MessageGroup';
import ModalCreateChannel from '../components/modal/ModalCreateChannel';
import { ChatContext } from '../context/ChatContext';
import iconDefault from '../assets/avatar-default.png'
import { Link } from 'react-router-dom';

const ChannelList = () => {
    const [isModalOpen, setIsmodalOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [previewImg, setPreviewImg] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { channels, setChannels, users, currentUser } = useContext(ChatContext)

    useEffect(() => {
        const createPreview = () => {
            if (!selectedIcon || !(selectedIcon instanceof Blob)) {
                return null;
            }

            try {
                const url = URL.createObjectURL(selectedIcon);
                return {
                    url: url,
                    type: selectedIcon.type
                };
            } catch (error) {
                console.error("Error creating object URL:", error);
                return null;
            }
        }

        const preview = createPreview();
        setPreviewImg(preview);

        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [selectedIcon]);

    const createChannel = () => {
        if (!newChannelName.trim()) return;

        const newChannel = {
            id: Date.now().toString(),
            img: {
                url: previewImg?.url || iconDefault,
                type: previewImg?.type || 'image/png'
            },
            name: newChannelName,
            creatorId: currentUser.id,
            users: [currentUser.id, selectedUsers],
        };

        setChannels([...channels, newChannel]);
        setNewChannelName('');
        setSelectedUsers([]);
        setSearchTerm('');
        setSelectedIcon('');
    };

    return (
        <>
            <Container>
                <div className="channels__wrapper">
                    <div className="channels">
                        <div className="channels__pannel">
                            <button onClick={() => setIsmodalOpen(true)}>
                                + Создать канал
                            </button>
                        </div>
                        <div className="channels__list">
                            {channels.map((channel, index) => (
                                <Link
                                    to={`./message/${channel.id}`}
                                    key={`${channel.id}-${index}`}>
                                    <MessageGroup channel={channel} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <ModalCreateChannel
                modal={isModalOpen}
                setModal={setIsmodalOpen}
                users={users}
                newChannelName={newChannelName}
                setNewChannelName={setNewChannelName}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                createChannel={createChannel}
            />
        </>
    )
}

export default ChannelList