import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, User, Clock, ChevronUp, ChevronDown, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  fullName: string;
  message: string;
  timestamp: Date;
}

interface FactoryChatProps {
  currentUser: string;
  onUserChange?: (user: string) => void;
}

export function FactoryChat({ currentUser, onUserChange }: FactoryChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(currentUser);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userProfiles = [
    { login: 'SoG1917', fullName: 'Stefan Göhner' },
    { login: 'SoG1', fullName: 'Sophie Göhner' },
    { login: 'SoGTest', fullName: 'Test User' },
    { login: 'MA61_Kartonowy_Napełniacz', fullName: 'Operator MA61 Kartonowy Napełniacz' },
    { login: 'MA59_Beutel_Machine', fullName: 'Operator MA59 Beutel Machine' },
    { login: 'MA62_Production_Line', fullName: 'Operator MA62 Production Line' },
    { login: 'MA63_Quality_Control', fullName: 'Operator MA63 Quality Control' },
    { login: 'MA64_Packaging_Unit', fullName: 'Operator MA64 Packaging Unit' },
    { login: 'Supervisor_Production', fullName: 'Production Shift Supervisor' },
    { login: 'Maintenance_Team', fullName: 'Technical Maintenance Team' }
  ];

  const emojis = [
    '😀', '😊', '😂', '🤣', '😍', '🥰', '😘', '😋',
    '😎', '🤔', '😴', '😢', '😭', '😡', '🤯', '😱',
    '👍', '👎', '👏', '🙌', '🤝', '💪', '🙏', '❤️',
    '🔥', '💯', '✅', '❌', '⚠️', '📊', '🎉', '🚀'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserFullName = (login: string) => {
    const profile = userProfiles.find(p => p.login === login);
    return profile ? profile.fullName : 'Unknown User';
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: selectedUser,
        fullName: getUserFullName(selectedUser),
        message: newMessage.trim(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUserChange = (newUser: string) => {
    setSelectedUser(newUser);
    if (onUserChange) {
      onUserChange(newUser);
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="bg-white dark:bg-gray-50 shadow-2xl border-2 border-gray-300 dark:border-gray-400">
        <CardHeader 
          className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <CardTitle className="text-base font-bold">Factory Chat</CardTitle>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {messages.length} wiadomości
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-1 h-auto"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-100">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-600 py-8">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Brak wiadomości. Napisz pierwszą!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`p-2 rounded-lg ${
                      msg.user === selectedUser 
                        ? 'bg-blue-100 dark:bg-blue-200 ml-8' 
                        : 'bg-white dark:bg-gray-200 mr-8'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-3 w-3 text-gray-600 dark:text-gray-700" />
                      <span className="font-semibold text-xs text-gray-800 dark:text-gray-700">
                        {msg.user} ({msg.fullName})
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{formatDateTime(msg.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-700 break-words">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-300 bg-white dark:bg-gray-50 space-y-2 relative">
              {/* User Selection */}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-700" />
                <Select value={selectedUser} onValueChange={handleUserChange}>
                  <SelectTrigger className="flex-1 h-8 text-xs bg-gray-50 dark:bg-gray-200 border-gray-300 dark:border-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-100">
                    {userProfiles.map((profile) => (
                      <SelectItem 
                        key={profile.login} 
                        value={profile.login}
                        className="text-xs hover:bg-gray-100 dark:hover:bg-gray-200 text-gray-900 dark:text-gray-800"
                      >
                        {profile.login} ({profile.fullName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Message Input */}
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Napisz wiadomość..."
                    className="h-8 text-xs bg-gray-50 dark:bg-gray-200 border-gray-300 dark:border-gray-400 text-gray-900 dark:text-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-600 pr-10"
                    data-testid="chat-message-input"
                  />
                  <Button
                    onClick={() => setShowEmojis(!showEmojis)}
                    size="sm"
                    className="absolute right-1 top-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-300 text-gray-600 dark:text-gray-700 border-0 h-6 w-6 p-0"
                    data-testid="emoji-toggle-button"
                  >
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white border-0 h-8 w-8 p-0"
                  data-testid="chat-send-button"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>

              {/* Emoji Picker */}
              {showEmojis && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-100 border border-gray-300 dark:border-gray-400 rounded-lg p-2 shadow-lg max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-8 gap-1">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={index}
                        onClick={() => addEmoji(emoji)}
                        className="h-8 w-8 p-0 text-base hover:bg-gray-100 dark:hover:bg-gray-200 bg-transparent border-0"
                        data-testid={`emoji-${index}`}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-500 dark:text-gray-600 text-center">
                Naciśnij Enter aby wysłać wiadomość
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}