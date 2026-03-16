import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const ConversationsList = ({ conversations, selectedConversation, onSelectConversation }) => {
    
    // Safe date formatting function
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown date';
        
        try {
            // Handle both Firestore timestamp and regular date
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleDateString();
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    return (
        <Card>
            <Card.Header>
                <h5 className="mb-0">Conversations</h5>
            </Card.Header>
            <ListGroup variant="flush">
                {!conversations || conversations.length === 0 ? (
                    <ListGroup.Item className="text-center text-muted">
                        No conversations yet
                    </ListGroup.Item>
                ) : (
                    conversations.map((conversation) => (
                        <ListGroup.Item
                            key={conversation.userId}
                            action
                            active={selectedConversation?.userId === conversation.userId}
                            onClick={() => onSelectConversation(conversation)}
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="flex-grow-1">
                                <div className="fw-bold">
                                    {conversation.userName || 'Unknown User'}
                                    <Badge 
                                        bg={conversation.userRole === 'admin' ? 'danger' : conversation.userRole === 'ngo' ? 'success' : 'primary'}
                                        className="ms-2"
                                        style={{ fontSize: '0.6rem' }}
                                    >
                                        {conversation.userRole || 'user'}
                                    </Badge>
                                </div>
                                <small className="text-muted text-truncate d-block">
                                    {conversation.lastMessageType === 'sent' && 'You: '}
                                    {conversation.lastMessage || 'No messages'}
                                </small>
                                <small className="text-muted">
                                    {formatDate(conversation.timestamp)}
                                </small>
                            </div>
                            {conversation.unreadCount > 0 && (
                                <Badge bg="danger" pill>
                                    {conversation.unreadCount}
                                </Badge>
                            )}
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Card>
    );
};

export default ConversationsList;