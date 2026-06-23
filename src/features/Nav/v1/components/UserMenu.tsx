import React from 'react';
import {
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
  BellRing,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavbar } from '../hooks/useNavbar';

interface UserMenuProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  onAuthToggle?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  user,
  onAuthToggle,
}) => {
  const { isUserMenuOpen: isOpen, toggleUserMenu: toggleProfileMenu } =
    useNavbar();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-2 xl:flex">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAuthToggle}
          className="px-5 py-2 text-[13px] font-semibold text-foreground/65 hover:text-foreground transition-colors cursor-pointer"
        >
          Sign In
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAuthToggle}
          className="rounded-full border border-primary bg-primary/90 hover:bg-primary px-5 py-2 text-[13px] font-semibold text-white transition-all cursor-pointer"
        >
          Get Started
        </motion.button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-4.5 xl:flex">
      {/* Notifications Button & Popover */}
      <div className="relative">
        <button
          onClick={() => setIsNotificationsOpen((value) => !value)}
          className="relative rounded-full p-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted/60 focus:outline-none"
          aria-label="Notifications"
          aria-expanded={isNotificationsOpen}
        >
          <Bell className="h-[18px] w-[18px]" />
          {/* Pulsing notification badge */}
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        <AnimatePresence>
          {isNotificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-border/80 bg-background/95 dark:bg-background/85 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-border/40 px-4 py-3 bg-muted/20">
                  <p className="text-xs font-bold tracking-wide uppercase text-foreground/80">
                    Notifications
                  </p>
                  <BellRing className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-3.5 p-4 max-h-[300px] overflow-y-auto">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 hover:bg-muted/40 transition-colors">
                    <p className="text-xs font-semibold text-foreground">
                      New community message
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      Your team replied to the latest post in General.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-3 hover:bg-muted/40 transition-colors">
                    <p className="text-xs font-semibold text-foreground">
                      Event reminder
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      CommDesk Sync starts in 30 minutes. Join the link!
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 hover:border-primary/40 hover:bg-muted/80 pl-1.5 pr-3 py-1 transition-all duration-200 focus:outline-none"
          aria-label="Open account menu"
          aria-expanded={isOpen}
        >
          {/* Avatar circle */}
          <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-[11px] font-bold overflow-hidden shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              user?.name.charAt(0)
            )}
            <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400 border border-background" />
          </div>
          <span className="text-[12px] font-medium text-foreground/80 hidden sm:block">
            {user?.name.split(' ')[0]}
          </span>
          <ChevronDown
            className={`h-3 w-3 text-foreground/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={toggleProfileMenu} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 mt-2.5 w-56 bg-background/95 dark:bg-background/85 border border-border/80 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
              >
                <div className="p-4 border-b border-border/40 bg-muted/10">
                  <p className="text-sm font-bold text-foreground leading-none">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 truncate">
                    alex.johnson@commdesk.com
                  </p>
                </div>
                <div className="p-2 space-y-0.5">
                  <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-semibold text-foreground/75 hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer text-left">
                    <UserIcon className="h-4 w-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-semibold text-foreground/75 hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer text-left">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="p-2 border-t border-border/40 bg-muted/5">
                  <button
                    onClick={onAuthToggle}
                    className="w-full flex items-center space-x-3 px-3.5 py-2.5 text-xs font-bold text-red-500 dark:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer text-left"
                  >
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
