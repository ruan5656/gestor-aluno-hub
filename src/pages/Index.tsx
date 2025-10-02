import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Sistema de Gestão de Alunos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gerencie seus alunos de forma simples e eficiente. Controle matrículas,
              dados pessoais e informações acadêmicas em um só lugar.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Acessar Sistema
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Criar Conta
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Gestão Completa</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre e gerencie todos os dados dos alunos em um único sistema
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Controle Acadêmico</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe cursos, turmas e matrículas de forma organizada
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Seguro e Confiável</h3>
              <p className="text-sm text-muted-foreground">
                Sistema protegido com autenticação e segurança de dados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
