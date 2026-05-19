import React, { useState, useMemo, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  GitBranch, 
  Share2, 
  Shield, 
  Rocket, 
  ChevronUp 
} from 'lucide-react';

// Types
interface GitCommand {
  command: string;
  description: string;
  category: 'Setup' | 'Basics' | 'Branching' | 'Remote' | 'Advanced' | 'GitHub';
  example?: string;
}

// Data
const gitCommands: GitCommand[] = [
  {
    command: 'gh repo create [name]',
    description: 'Creates a new repository on GitHub (requires GitHub CLI)',
    category: 'GitHub',
    example: 'gh repo create my-project --public'
  },
  {
    command: 'gh pr create',
    description: 'Creates a pull request on GitHub',
    category: 'GitHub'
  },
  {
    command: 'gh pr merge',
    description: 'Merges a pull request on GitHub',
    category: 'GitHub'
  },
  {
    command: 'git remote add upstream [url]',
    description: 'Adds the original repository as an upstream remote to a fork',
    category: 'GitHub'
  },
  {
    command: 'git fetch upstream',
    description: 'Fetches changes from the original repository in a fork',
    category: 'GitHub'
  },
  {
    command: 'git config --global user.name "[name]"',
    description: 'Sets the name you want attached to your commit transactions',
    category: 'Setup',
    example: 'git config --global user.name "John Doe"'
  },
  {
    command: 'git config --global user.email "[email address]"',
    description: 'Sets the email you want attached to your commit transactions',
    category: 'Setup',
    example: 'git config --global user.email "john@example.com"'
  },
  {
    command: 'git init [project-name]',
    description: 'Creates a new local repository with the specified name',
    category: 'Setup',
    example: 'git init my-cool-project'
  },
  {
    command: 'git clone [url]',
    description: 'Downloads a project and its entire version history',
    category: 'Setup',
    example: 'git clone https://github.com/user/repo.git'
  },
  {
    command: 'git status',
    description: 'Lists all new or modified files to be committed',
    category: 'Basics'
  },
  {
    command: 'git add [file]',
    description: 'Snapshots the file in preparation for versioning',
    category: 'Basics',
    example: 'git add index.html'
  },
  {
    command: 'git add .',
    description: 'Snapshots all files in preparation for versioning',
    category: 'Basics'
  },
  {
    command: 'git commit -m "[descriptive message]"',
    description: 'Records file snapshots permanently in version history',
    category: 'Basics',
    example: 'git commit -m "Add hero section"'
  },
  {
    command: 'git log',
    description: 'Lists version history for the current branch',
    category: 'Basics'
  },
  {
    command: 'git diff',
    description: 'Shows the differences between the working directory and the staging area',
    category: 'Basics'
  },
  {
    command: 'git branch',
    description: 'Lists all local branches in the current repository',
    category: 'Branching'
  },
  {
    command: 'git branch [branch-name]',
    description: 'Creates a new branch',
    category: 'Branching',
    example: 'git branch feature-login'
  },
  {
    command: 'git checkout [branch-name]',
    description: 'Switches to the specified branch and updates the working directory',
    category: 'Branching',
    example: 'git checkout feature-login'
  },
  {
    command: 'git checkout -b [branch-name]',
    description: 'Creates a new branch and switches to it',
    category: 'Branching',
    example: 'git checkout -b feature-dark-mode'
  },
  {
    command: 'git merge [branch]',
    description: 'Combines the specified branch’s history into the current branch',
    category: 'Branching',
    example: 'git merge feature-login'
  },
  {
    command: 'git remote add [name] [url]',
    description: 'Connects your local repo to a remote server',
    category: 'Remote',
    example: 'git remote add origin https://github.com/user/repo.git'
  },
  {
    command: 'git push [variable] [branch]',
    description: 'Sends the committed changes of master branch to your remote repository',
    category: 'Remote',
    example: 'git push origin main'
  },
  {
    command: 'git pull',
    description: 'Fetches and merges changes on the remote server to your working directory',
    category: 'Remote'
  },
  {
    command: 'git stash',
    description: 'Temporarily stores all modified tracked files',
    category: 'Advanced'
  },
  {
    command: 'git stash pop',
    description: 'Restores the most recently stashed files',
    category: 'Advanced'
  },
  {
    command: 'git rebase [branch]',
    description: 'Applies any commits of current branch ahead of specified branch',
    category: 'Advanced',
    example: 'git rebase main'
  },
  {
    command: 'git reset --soft HEAD~1',
    description: 'Undo the last commit while keeping your changes staged',
    category: 'Advanced'
  },
  {
    command: 'git reset --hard HEAD~1',
    description: 'Undo the last commit and discard all changes (DANGEROUS)',
    category: 'Advanced'
  }
];

// Components
const Navbar = () => (
  <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            GitMaster
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 px-4 py-1 bg-slate-900/50 rounded-full border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#3178c6]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TypeScript</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#61dafb]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">React</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tailwind</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="text-sm font-medium">GitHub</span>
            <GitBranch size={20} />
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onSearch, searchValue }: { onSearch: (val: string) => void, searchValue: string }) => (
  <div className="relative py-20 overflow-hidden">
    <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Project Languages: TypeScript (94.2%), CSS (5.1%), HTML (0.7%)
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Master <span className="text-blue-500">Git</span> & <span className="text-slate-400">GitHub</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate cheat sheet for developers. Everything from basic setup to advanced branching and collaboration.
        </p>

        <div className="max-w-xl mx-auto mb-6">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-[#3178c6] w-[94.2%] transition-all duration-1000" title="TypeScript 94.2%" />
            <div className="h-full bg-[#38bdf8] w-[5.1%] transition-all duration-1000" title="CSS 5.1%" />
            <div className="h-full bg-[#e34c26] w-[0.7%] transition-all duration-1000" title="HTML 0.7%" />
          </div>
        </div>

        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            value={searchValue}
            className="block w-full pl-11 pr-12 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-2xl"
            placeholder="Search commands (e.g. 'commit', 'branch', 'remote')..."
            onChange={(e) => onSearch(e.target.value)}
          />
          {searchValue && (
            <button 
              onClick={() => onSearch('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
            >
              <div className="bg-slate-800 hover:bg-slate-700 p-1 rounded-md">
                <span className="text-xs font-bold px-1">ESC</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CommandCard = ({ command, description, example, category, onRun }: GitCommand & { onRun?: (cmd: string) => void }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command.replace(/\[.*?\]/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 px-2 py-1 bg-blue-400/10 rounded">
          {category}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onRun?.(command.replace(/\[.*?\]/g, 'git-repo'))}
            className="text-slate-500 hover:text-green-400 transition-colors"
            title="Run command"
          >
            <Rocket size={18} />
          </button>
          <button
            onClick={copyToClipboard}
            className="text-slate-500 hover:text-white transition-colors"
            title="Copy command"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      <code className="block bg-black/50 p-3 rounded-lg text-blue-300 font-mono text-sm mb-3 break-all">
        {command}
      </code>
      <p className="text-slate-400 text-sm leading-relaxed flex-grow">{description}</p>
      {example && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-tight">Example</p>
          <code className="text-xs text-slate-300 font-mono">{example}</code>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children, image, imageAlt, description }: { title: string, children: React.ReactNode, image?: string, imageAlt?: string, description?: string }) => (
  <section className="py-12 border-t border-slate-800">
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      {description && <p className="text-slate-400 max-w-3xl mb-8">{description}</p>}
      {image && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 p-2 shadow-2xl">
          <img src={image} alt={imageAlt || title} className="w-full h-auto rounded-xl object-cover" />
        </div>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
  </section>
);

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!visible) return null;
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 z-50"
    >
      <ChevronUp size={24} />
    </button>
  );
};

const TerminalSimulator = ({ lastCommand }: { lastCommand: string }) => {
  const [history, setHistory] = useState<{ cmd: string; out: string }[]>([]);

  useEffect(() => {
    if (lastCommand) {
      const responses: Record<string, string> = {
        'git status': 'On branch main\nYour branch is up to date with "origin/main".\n\nnothing to commit, working tree clean',
        'git branch': '* main\n  feature-login\n  bugfix-header',
        'git log': 'commit a1b2c3d\nAuthor: Dev <dev@example.com>\nDate: Mon Oct 20 2025\n\n    Add hero section\n\ncommit e5f6g7h\nAuthor: Dev <dev@example.com>\nDate: Sun Oct 19 2025\n\n    Initial commit',
        'git remote -v': 'origin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)',
      };

      const cleanCmd = lastCommand.split(' ')[0] + ' ' + (lastCommand.split(' ')[1] || '');
      const output = responses[lastCommand] || responses[cleanCmd] || `Command "${lastCommand}" executed successfully.`;
      
      setHistory(prev => [...prev, { cmd: lastCommand, out: output }].slice(-5));
    }
  }, [lastCommand]);

  return (
    <div className="bg-black border border-slate-800 rounded-xl overflow-hidden font-mono text-sm mb-12 shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-slate-500 text-xs ml-2">bash — git-simulator</span>
      </div>
      <div className="p-4 h-64 overflow-y-auto bg-black/90">
        {history.length === 0 && (
          <p className="text-slate-600 italic">Click "Run" on any command card to simulate execution...</p>
        )}
        {history.map((item, i) => (
          <div key={i} className="mb-4">
            <div className="flex gap-2 text-green-400">
              <span>$</span>
              <span>{item.cmd}</span>
            </div>
            <div className="text-slate-300 whitespace-pre-wrap mt-1 ml-4 opacity-80">
              {item.out}
            </div>
          </div>
        ))}
        <div className="flex gap-2 text-green-400 animate-pulse">
          <span>$</span>
          <span className="w-2 h-5 bg-green-400/50" />
        </div>
      </div>
    </div>
  );
};

// Main GitMaster Application
function GitMaster() {
  const [search, setSearch] = useState('');
  const [activeCmd, setActiveCmd] = useState('');

  const filteredCommands = useMemo(() => {
    return gitCommands.filter(cmd => 
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero onSearch={setSearch} searchValue={search} />

        <TerminalSimulator lastCommand={activeCmd} />

        {search ? (
          <div className="py-12">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <Terminal size={24} className="text-blue-500" />
              Search Results for "{search}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-500 text-lg">No commands found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Section title="1. Getting Started" image="/git-workflow-pro.png" description="Initialize your environment and start versioning.">
              {gitCommands.filter(c => c.category === 'Setup').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>

            <Section title="2. The Basic Workflow" image="/git-states-pro.png" description="Track changes and save your progress daily.">
              {gitCommands.filter(c => c.category === 'Basics').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>

            <Section title="3. Branching & Merging" image="/git-branching.png" description="Work on features without affecting the main code.">
              {gitCommands.filter(c => c.category === 'Branching').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>

            <Section title="4. Remote Repositories" image="/github-collab.png" description="Collaborate globally via GitHub.">
              {gitCommands.filter(c => c.category === 'Remote').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>

            <Section title="5. Advanced Git" image="/git-history.png" description="Master complex history manipulation.">
              {gitCommands.filter(c => c.category === 'Advanced').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>

            <Section title="6. GitHub & Collaboration" description="Leverage GitHub specialized tools.">
              {gitCommands.filter(c => c.category === 'GitHub').map((cmd, idx) => <CommandCard key={idx} {...cmd} onRun={setActiveCmd} />)}
            </Section>
          </>
        )}
      </main>
      <BackToTop />
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex flex-col items-center gap-2"><GitBranch size={24} className="text-blue-500" /><span className="text-xs text-slate-500">Branching</span></div>
          <div className="flex flex-col items-center gap-2"><Share2 size={24} className="text-purple-500" /><span className="text-xs text-slate-500">Share</span></div>
          <div className="flex flex-col items-center gap-2"><Shield size={24} className="text-green-500" /><span className="text-xs text-slate-500">Secure</span></div>
          <div className="flex flex-col items-center gap-2"><Rocket size={24} className="text-orange-500" /><span className="text-xs text-slate-500">Deploy</span></div>
        </div>
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} GitMaster Guide.</p>
      </footer>
    </div>
  );
}

export default GitMaster;
