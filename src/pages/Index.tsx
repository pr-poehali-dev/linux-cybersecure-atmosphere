import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; animationDelay: number }>>([])

  useEffect(() => {
    const newDrops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3
    }))
    setDrops(newDrops)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {drops.map(drop => (
        <div
          key={drop.id}
          className="absolute text-xs font-code text-primary animate-matrix-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.animationDelay}s`
          }}
        >
          {Math.random().toString(36).substring(2, 8)}
        </div>
      ))}
    </div>
  )
}

const TerminalWindow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-black border border-primary/20 rounded-lg overflow-hidden">
    <div className="bg-primary/10 px-4 py-2 border-b border-primary/20">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <span className="ml-2 text-sm font-code text-primary">{title}</span>
      </div>
    </div>
    <div className="p-4 font-code text-sm text-primary">
      {children}
    </div>
  </div>
)

export default function Index() {
  const [theme, setTheme] = useState('dark')
  const [terminalText, setTerminalText] = useState('')
  const fullTerminalText = '$ whoami\nhacker\n$ ls -la /skills\ndrwxr-xr-x linux-mastery\ndrwxr-xr-x penetration-testing\ndrwxr-xr-x network-security\n$ echo "Ready to hack the matrix"'

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullTerminalText.length) {
        setTerminalText(fullTerminalText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const courses = [
    {
      title: 'Linux Fundamentals',
      description: 'Освоение командной строки и системного администрирования',
      level: 'Начинающий',
      duration: '4 недели',
      icon: 'Terminal',
      progress: 0
    },
    {
      title: 'Network Security',
      description: 'Анализ сетевого трафика и защита от атак',
      level: 'Средний',
      duration: '6 недель',
      icon: 'Shield',
      progress: 25
    },
    {
      title: 'Penetration Testing',
      description: 'Этичный хакинг и тестирование на проникновение',
      level: 'Продвинутый',
      duration: '8 недель',
      icon: 'Zap',
      progress: 60
    }
  ]

  const labs = [
    {
      title: 'SQL Injection Lab',
      description: 'Практика поиска и эксплуатации SQL инъекций',
      difficulty: 'Medium',
      status: 'active'
    },
    {
      title: 'Buffer Overflow Challenge',
      description: 'Изучение переполнения буфера и эксплоитов',
      difficulty: 'Hard',
      status: 'locked'
    },
    {
      title: 'Web App Security',
      description: 'Анализ безопасности веб-приложений',
      difficulty: 'Easy',
      status: 'completed'
    }
  ]

  const achievements = [
    { title: 'First Steps', description: 'Первый запуск терминала', unlocked: true },
    { title: 'Script Kiddie', description: 'Выполнено 10 команд Linux', unlocked: true },
    { title: 'Shell Master', description: 'Написан первый bash скрипт', unlocked: false },
    { title: 'Network Ninja', description: 'Проанализирован сетевой трафик', unlocked: false }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <MatrixRain />
      
      {/* Header */}
      <header className="relative z-10 border-b border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-primary animate-pulse-green" size={32} />
              <h1 className="text-2xl font-orbitron font-bold text-primary">CyberAcademy</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-primary hover:text-primary/80 transition-colors">Главная</a>
              <a href="#courses" className="text-foreground hover:text-primary transition-colors">Курсы</a>
              <a href="#practice" className="text-foreground hover:text-primary transition-colors">Практика</a>
              <a href="#terminal" className="text-foreground hover:text-primary transition-colors">Терминал</a>
              <a href="#community" className="text-foreground hover:text-primary transition-colors">Сообщество</a>
              <a href="#achievements" className="text-foreground hover:text-primary transition-colors">Достижения</a>
            </nav>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-orbitron font-black mb-6 text-primary animate-glow">
              HACK THE MATRIX
            </h1>
            <p className="text-xl mb-8 font-code text-muted-foreground">
              Изучай Linux и кибербезопасность как настоящий хакер
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 animate-glow">
                <Icon name="Play" size={20} />
                Начать обучение
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Icon name="Terminal" size={20} />
                Открыть терминал
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">1337</div>
              <div className="text-sm text-muted-foreground">Активных хакеров</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Курсов по безопасности</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Виртуальные лаборатории</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Практических заданий</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
            <Icon name="GraduationCap" className="inline mr-4" size={40} />
            Курсы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={course.icon as any} className="text-primary" size={24} />
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="font-orbitron text-primary">{course.title}</CardTitle>
                  <CardDescription className="font-code text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="text-primary font-code">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>⏱️ {course.duration}</span>
                      <span>🎯 {course.level}</span>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Продолжить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Labs Section */}
      <section id="practice" className="relative z-10 py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
            <Icon name="Cpu" className="inline mr-4" size={40} />
            Виртуальные лаборатории
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labs.map((lab, index) => (
              <Card key={index} className="bg-card border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={lab.difficulty === 'Easy' ? 'secondary' : lab.difficulty === 'Medium' ? 'default' : 'destructive'}
                      className="font-code"
                    >
                      {lab.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        lab.status === 'active' ? 'bg-primary animate-pulse-green' :
                        lab.status === 'completed' ? 'bg-green-500' : 'bg-muted'
                      }`}></div>
                      <span className="text-xs font-code text-muted-foreground">
                        {lab.status === 'active' ? 'ONLINE' : 
                         lab.status === 'completed' ? 'COMPLETED' : 'LOCKED'}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="font-orbitron text-primary">{lab.title}</CardTitle>
                  <CardDescription className="font-code text-sm">
                    {lab.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    disabled={lab.status === 'locked'}
                    variant={lab.status === 'completed' ? 'secondary' : 'default'}
                  >
                    {lab.status === 'locked' ? (
                      <>
                        <Icon name="Lock" size={16} />
                        Заблокировано
                      </>
                    ) : lab.status === 'completed' ? (
                      <>
                        <Icon name="CheckCircle" size={16} />
                        Пройдено
                      </>
                    ) : (
                      <>
                        <Icon name="Play" size={16} />
                        Запустить лабораторию
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section id="terminal" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
            <Icon name="Terminal" className="inline mr-4" size={40} />
            Интерактивный терминал
          </h2>
          <div className="max-w-4xl mx-auto">
            <TerminalWindow title="root@cyberacademy:~/">
              <div className="whitespace-pre-wrap">
                {terminalText}
                <span className="animate-pulse-green">_</span>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
            <Icon name="Users" className="inline mr-4" size={40} />
            Сообщество хакеров
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron text-primary">
                  <Icon name="MessageSquare" className="inline mr-2" size={20} />
                  Форум
                </CardTitle>
                <CardDescription className="font-code">
                  Обсуждение техник и решение задач
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded border border-primary/20">
                    <div className="w-8 h-8 bg-primary rounded text-primary-foreground flex items-center justify-center font-code text-xs">
                      H1
                    </div>
                    <div>
                      <div className="font-code text-sm text-primary">@cyberhacker: Новая уязвимость в Apache</div>
                      <div className="text-xs text-muted-foreground">2 минуты назад</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                    <div className="w-8 h-8 bg-muted rounded text-muted-foreground flex items-center justify-center font-code text-xs">
                      N1
                    </div>
                    <div>
                      <div className="font-code text-sm">@newbie: Помогите с командой grep</div>
                      <div className="text-xs text-muted-foreground">5 минут назад</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron text-primary">
                  <Icon name="Trophy" className="inline mr-2" size={20} />
                  Рейтинг
                </CardTitle>
                <CardDescription className="font-code">
                  Топ хакеров недели
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['elite_hacker', 'matrix_neo', 'cyber_ghost'].map((username, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-primary/10 rounded border border-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="text-primary font-orbitron font-bold">#{index + 1}</div>
                        <div className="font-code text-primary">{username}</div>
                      </div>
                      <div className="text-primary font-code">{1000 - index * 100} XP</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-primary">
            <Icon name="Award" className="inline mr-4" size={40} />
            Достижения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`bg-card border-primary/20 transition-all duration-300 ${
                achievement.unlocked ? 'hover:shadow-lg hover:shadow-primary/20 animate-glow' : 'opacity-50'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={achievement.unlocked ? 'CheckCircle' : 'Lock'} size={24} />
                  </div>
                  <h3 className="font-orbitron font-bold mb-2 text-primary">
                    {achievement.title}
                  </h3>
                  <p className="text-sm font-code text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="relative z-10 py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="skills" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-card border-primary/20">
              <TabsTrigger value="skills" className="font-code">
                <Icon name="Brain" size={16} />
                Навыки
              </TabsTrigger>
              <TabsTrigger value="tools" className="font-code">
                <Icon name="Wrench" size={16} />
                Инструменты
              </TabsTrigger>
              <TabsTrigger value="network" className="font-code">
                <Icon name="Network" size={16} />
                Сеть
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TerminalWindow title="skills.sh">
                  <div className="space-y-2">
                    <div className="text-primary">#!/bin/bash</div>
                    <div><span className="text-yellow-400">echo</span> "Linux Commands: Advanced"</div>
                    <div><span className="text-yellow-400">echo</span> "Network Analysis: Expert"</div>
                    <div><span className="text-yellow-400">echo</span> "Penetration Testing: Intermediate"</div>
                    <div><span className="text-yellow-400">echo</span> "Cryptography: Beginner"</div>
                  </div>
                </TerminalWindow>
                <div className="space-y-4">
                  <h3 className="text-2xl font-orbitron font-bold text-primary">Развивай навыки</h3>
                  <p className="font-code text-muted-foreground">
                    Изучай реальные техники, которые используют профессионалы в области кибербезопасности.
                  </p>
                  <ul className="space-y-2 font-code text-sm">
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircle" className="text-primary" size={16} />
                      Командная строка Linux
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircle" className="text-primary" size={16} />
                      Сетевые протоколы
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="CheckCircle" className="text-primary" size={16} />
                      Этичный хакинг
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'John the Ripper', 'Hashcat'].map((tool, index) => (
                  <Card key={index} className="bg-card border-primary/20 text-center">
                    <CardContent className="p-6">
                      <Icon name="Wrench" className="text-primary mx-auto mb-3" size={32} />
                      <h3 className="font-orbitron font-bold text-primary mb-2">{tool}</h3>
                      <p className="text-xs font-code text-muted-foreground">
                        Профессиональный инструмент
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="network" className="mt-8">
              <div className="text-center">
                <img 
                  src="/img/2a4526da-04e0-4cc8-addf-efb50ca55bde.jpg" 
                  alt="Cybersecurity Network" 
                  className="w-full max-w-2xl mx-auto rounded-lg border border-primary/20 mb-8"
                />
                <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
                  Анализ сетевой архитектуры
                </h3>
                <p className="font-code text-muted-foreground max-w-2xl mx-auto">
                  Изучай структуру сетей, находи уязвимости и создавай системы защиты в реальных сценариях.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Shield" className="text-primary animate-pulse-green" size={24} />
              <span className="font-orbitron font-bold text-primary">CyberAcademy</span>
            </div>
            <p className="font-code text-sm text-muted-foreground mb-4">
              Безопасность через знания. Знания через практику.
            </p>
            <div className="flex justify-center gap-6 text-sm font-code">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">О нас</a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">Контакты</a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">GitHub</a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}