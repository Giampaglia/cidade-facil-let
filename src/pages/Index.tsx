import React from 'react';
import { ReportProblemForm } from '@/components/report-problem-form';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, Home, FileText, MessageCircle, Settings } from 'lucide-react';
import cityHero from '@/assets/city-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Cidade Fácil</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-foreground">
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Minhas Solicitações
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contato
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={cityHero} 
            alt="Vista da cidade com serviços municipais" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Serviços Municipais
            <span className="text-primary block">Simplificados</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Reporte problemas, acompanhe solicitações e mantenha-se informado sobre sua cidade - tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary text-white shadow-elevated hover:shadow-lg transition-all">
              <FileText className="h-5 w-5 mr-2" />
              Ver Minhas Solicitações
            </Button>
            <Button variant="outline" size="lg" className="shadow-soft">
              <MessageCircle className="h-5 w-5 mr-2" />
              Falar com Atendente
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <ReportProblemForm />
        </div>
      </main>

      {/* Quick Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Precisa de Ajuda?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Nossa equipe está sempre pronta para atender você. Entre em contato para tirar dúvidas ou obter suporte.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="shadow-soft hover:shadow-elevated transition-all"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Falar com Atendente
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-foreground">Cidade Fácil</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Cidade Fácil. Facilitando a vida dos cidadãos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
