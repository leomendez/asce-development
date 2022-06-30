import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return <div className="text-3xl font-bold underline">HI</div>;
}
