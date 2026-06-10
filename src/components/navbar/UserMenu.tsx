import React from 'react';
import { Bell, Settings, LogOut, User as UserIcon, ChevronDown, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavbar } from '../../hooks/useNavbar';

interface UserMenuProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  onAuthToggle?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated, user, onAuthToggle }) => {
  const { isUserMenuOpen: isOpen, toggleUserMenu: toggleProfileMenu } = useNavbar();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-3 xl:flex">
        <button onClick={onAuthToggle} className="px-2 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
          Sign In
        </button>
        <button onClick={onAuthToggle} className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95">
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 xl:flex">
      <div className="relative">
        <button
          onClick={() => setIsNotificationsOpen((value) => !value)}
          className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          aria-label="Notifications"
          aria-expanded={isNotificationsOpen}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-red-500" />
        </button>

        <AnimatePresence>
          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold">Notifications</p>
                  <BellRing className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-3 p-4">
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-sm font-medium">New community message</p>
                    <p className="mt-1 text-xs text-muted-foreground">Your team replied to the latest post.</p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-3">
                    <p className="text-sm font-medium">Event reminder</p>
                    <p className="mt-1 text-xs text-muted-foreground">CommDesk Sync starts in 30 minutes.</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center space-x-2 p-1 rounded-full border border-border bg-muted/30 hover:bg-muted/50 transition-all"
          aria-label="Open account menu"
          aria-expanded={isOpen}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white overflow-hidden text-xs font-bold">
            {user?.avatar ? <img src={user.avatar} alt={user.name} /> : user?.name.charAt(0)}
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={toggleProfileMenu} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">View profile</p>
                </div>
                <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <UserIcon className="h-4 w-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="p-2 border-t border-border">
                  <button onClick={onAuthToggle} className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
