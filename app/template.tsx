import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import { cn } from '@/libs/utils';
const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={cn('container relative max-w-screen-xl ')}>
        <Navigation />
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Template;
