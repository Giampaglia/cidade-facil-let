import React, { useState } from 'react';
import { MapPin, Send, AlertCircle, CheckCircle2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'iluminacao', label: 'Iluminação Pública' },
  { value: 'buraco', label: 'Buraco na Via' },
  { value: 'limpeza', label: 'Limpeza e Coleta' },
  { value: 'agua', label: 'Água e Esgoto' },
  { value: 'sinalizacao', label: 'Sinalização' },
  { value: 'arvore', label: 'Poda de Árvores' },
  { value: 'outros', label: 'Outros' },
];

export const ReportProblemForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [useGPS, setUseGPS] = useState(false);
  
  const { toast } = useToast();

  const handleGetLocation = () => {
    setUseGPS(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setUseGPS(false);
          toast({
            title: "Localização obtida!",
            description: "Sua localização foi detectada automaticamente.",
            variant: "default",
          });
        },
        () => {
          setUseGPS(false);
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter sua localização. Digite o endereço manualmente.",
            variant: "destructive",
          });
        }
      );
    } else {
      setUseGPS(false);
      toast({
        title: "GPS não disponível",
        description: "Digite o endereço manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) {
      toast({
        title: "Localização obrigatória",
        description: "Precisamos saber onde o problema está!",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Categoria obrigatória",
        description: "Selecione o tipo de problema para prosseguir.",
        variant: "destructive",
      });
      return;
    }

    if (description.trim().length < 10) {
      toast({
        title: "Descrição muito curta",
        description: "Descreva o problema com pelo menos 10 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Problema reportado com sucesso!",
        description: "Sua solicitação foi enviada. Você receberá atualizações em breve.",
        variant: "default",
      });
      
      // Reset form
      setLocation('');
      setCategory('');
      setDescription('');
      setFiles([]);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elevated">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Reportar Problema
          </h2>
          <p className="text-muted-foreground">
            Ajude a melhorar nossa cidade reportando problemas urbanos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              Localização *
            </Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Digite o endereço ou use GPS"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 h-12"
                disabled={useGPS}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGetLocation}
                disabled={useGPS}
                className="h-12 px-4"
              >
                {useGPS ? (
                  <Navigation className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Tipo de Problema *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione a categoria do problema" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload de arquivos */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Fotos e Vídeos (Opcional)
            </Label>
            <FileUpload onFilesChange={setFiles} maxFiles={3} />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Descrição do Problema *
            </Label>
            <Textarea
              id="description"
              placeholder="Ex: Poste de luz quebrado na esquina da Rua A com Rua B, sem iluminação há 3 dias"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/500 caracteres
            </p>
          </div>

          {/* Botão de envio */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-primary text-white font-medium shadow-elevated hover:shadow-lg transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Solicitação
              </>
            )}
          </Button>
        </form>

        {/* Informações adicionais */}
        <div className="mt-8 p-4 bg-gradient-hero rounded-lg border">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">
                O que acontece depois?
              </h4>
              <p className="text-sm text-muted-foreground">
                Sua solicitação será analisada pela equipe responsável e você receberá 
                atualizações sobre o andamento via notificações.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};