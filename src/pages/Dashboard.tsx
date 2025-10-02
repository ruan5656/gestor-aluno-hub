import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, LogOut, Plus } from "lucide-react";
import { StudentList } from "@/components/StudentList";
import { StudentDialog } from "@/components/StudentDialog";

export type Student = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  curso?: string;
  turma?: string;
  data_matricula: string;
  ativo: boolean;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadStudents();
    }
  }, [user]);

  const loadStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("alunos")
      .select("*")
      .order("nome", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar alunos",
        description: error.message,
      });
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setDialogOpen(true);
  };

  const handleDeleteStudent = async (id: string) => {
    const { error } = await supabase.from("alunos").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir aluno",
        description: error.message,
      });
    } else {
      toast({
        title: "Aluno excluído",
        description: "O aluno foi removido com sucesso",
      });
      loadStudents();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Gestão de Alunos</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Alunos</h2>
            <p className="text-muted-foreground">
              Gerencie todos os alunos cadastrados
            </p>
          </div>
          <Button onClick={handleAddStudent}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        <StudentList
          students={students}
          loading={loading}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </main>

      <StudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        student={editingStudent}
        onSuccess={loadStudents}
      />
    </div>
  );
};

export default Dashboard;