import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Student } from "@/pages/Dashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type StudentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSuccess: () => void;
};

type StudentFormData = Omit<Student, "id">;

export const StudentDialog = ({
  open,
  onOpenChange,
  student,
  onSuccess,
}: StudentDialogProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch } = useForm<StudentFormData>();
  const ativo = watch("ativo", true);

  useEffect(() => {
    if (student) {
      reset(student);
    } else {
      reset({
        nome: "",
        email: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
        endereco: "",
        cidade: "",
        estado: "",
        cep: "",
        curso: "",
        turma: "",
        data_matricula: new Date().toISOString().split("T")[0],
        ativo: true,
      });
    }
  }, [student, reset]);

  const onSubmit = async (data: StudentFormData) => {
    if (student) {
      const { error } = await supabase
        .from("alunos")
        .update(data)
        .eq("id", student.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar aluno",
          description: error.message,
        });
      } else {
        toast({
          title: "Aluno atualizado",
          description: "Os dados foram salvos com sucesso",
        });
        onSuccess();
        onOpenChange(false);
      }
    } else {
      const { error } = await supabase.from("alunos").insert(data);

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao criar aluno",
          description: error.message,
        });
      } else {
        toast({
          title: "Aluno criado",
          description: "O aluno foi cadastrado com sucesso",
        });
        onSuccess();
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {student ? "Editar Aluno" : "Novo Aluno"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo *</Label>
              <Input id="nome" {...register("nome")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input id="cpf" {...register("cpf")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_nascimento">Data de Nascimento *</Label>
              <Input
                id="data_nascimento"
                type="date"
                {...register("data_nascimento")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" {...register("telefone")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" {...register("cep")} />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" {...register("endereco")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" {...register("cidade")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" {...register("estado")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="curso">Curso</Label>
              <Input id="curso" {...register("curso")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="turma">Turma</Label>
              <Input id="turma" {...register("turma")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_matricula">Data de Matrícula *</Label>
              <Input
                id="data_matricula"
                type="date"
                {...register("data_matricula")}
                required
              />
            </div>

            <div className="space-y-2 flex items-center gap-2">
              <Switch
                id="ativo"
                checked={ativo}
                onCheckedChange={(checked) => setValue("ativo", checked)}
              />
              <Label htmlFor="ativo">Ativo</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {student ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
