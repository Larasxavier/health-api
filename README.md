#  Clínica Vida Clara — Health API

Projeto **Node.js** de simulação de uma API para área de saúde, criado para testes locais, observabilidade manual e deploy em ambientes como **CPS1**.

>  Objetivo: gerar **dados realistas de pacientes**, **métricas**, **traces simulados** e **logs**, todos consultáveis diretamente via terminal ou navegador — **sem OpenTelemetry por enquanto**.

---

## Funcionalidades

### Pacientes
- 1000 pacientes simulados
- Campos:
  - Nome, idade, sexo
  - Cidade / UF
  - **Setor hospitalar** (UTI, Emergência, Pediatria, etc.)
  - Ala e leito
  - Dias de internamento
  - Comorbidades

### Métricas (manual)
Disponível em:
