import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Brain,
  Target,
  ShieldAlert,
  CheckCircle,
  ChevronRight,
  Home,
  Shuffle,
  RefreshCw,
} from "lucide-react";

// ==========================================
// 1. BASE DE DATOS DE ESTUDIO (200 CARDS DE DECK)
// ==========================================

const STUDY_PLAN = [
  {
    week: "Semana 1: Cómputo, Almacenamiento, Redes y Bases de Datos (50 Tarjetas)",
    tasks: [
      {
        id: "w1_1",
        title: "Infraestructura Global y VPC (Subnets, NACLs, SGs, IGW, NAT)",
      },
      {
        id: "w1_2",
        title: "Cómputo: EC2 (Tipos y Precios), Lambda, ECS, EKS, Beanstalk",
      },
      {
        id: "w1_3",
        title:
          "Almacenamiento: S3 (Clases/Lifecycle), EBS vs EFS, Storage Gateway",
      },
      {
        id: "w1_4",
        title:
          "Bases de Datos: RDS, Aurora, DynamoDB, Redshift, ElastiCache, Neptune",
      },
    ],
  },
  {
    week: "Semana 2: Seguridad, Identidad y Cumplimiento (50 Tarjetas)",
    tasks: [
      { id: "w2_1", title: "Modelo de Responsabilidad Compartida" },
      {
        id: "w2_2",
        title: "IAM: Usuarios, Grupos, Roles, Políticas JSON, MFA",
      },
      {
        id: "w2_3",
        title: "Monitoreo y Auditoría: CloudTrail vs CloudWatch vs AWS Config",
      },
      {
        id: "w2_4",
        title:
          "Protección Perimetral y Amenazas: WAF, Shield, GuardDuty, Macie, Inspector",
      },
      {
        id: "w2_5",
        title:
          "Cifrado y Secretos: KMS, CloudHSM, Secrets Manager, Parameter Store",
      },
    ],
  },
  {
    week: "Semana 3: Conceptos Cloud, Well-Architected y Facturación (50 Tarjetas)",
    tasks: [
      {
        id: "w3_1",
        title: "Economía Cloud: OpEx vs CapEx, TCO, Economía de Escala",
      },
      { id: "w3_2", title: "Well-Architected Framework: Los 6 Pilares" },
      {
        id: "w3_3",
        title:
          "Herramientas de Costos: Pricing Calculator, Cost Explorer, Budgets, CUR",
      },
      {
        id: "w3_4",
        title:
          "Gobernanza: AWS Organizations, SCPs, Control Tower, Trusted Advisor",
      },
      {
        id: "w3_5",
        title: "Planes de Soporte: Basic, Developer, Business, Enterprise",
      },
    ],
  },
  {
    week: "Semana 4: Migración, Integración, Mensajería y Redes Globales (50 Tarjetas)",
    tasks: [
      {
        id: "w4_1",
        title:
          "Estrategias de Migración (6 Rs), DMS, SCT, DataSync, Application Discovery",
      },
      {
        id: "w4_2",
        title: "Familia AWS Snow: Snowcone, Snowball Edge, Snowmobile",
      },
      {
        id: "w4_3",
        title: "Mensajería e Integración: SQS, SNS, EventBridge, AppSync",
      },
      {
        id: "w4_4",
        title:
          "Rendimiento Global: CloudFront, Global Accelerator, Direct Connect, Route 53",
      },
      {
        id: "w4_5",
        title: "Simulaciones de examen e iteración final del Banco de Errores",
      },
    ],
  },
];

const FLASHCARDS = [
  // ==========================================
  // SEMANA 1: CÓMPUTO, ALMACENAMIENTO, REDES Y BD (50 TARJETAS)
  // ==========================================
  {
    id: 101,
    category: "Semana 1",
    front: "S3: Definición",
    back: "Almacenamiento de Objetos ilimitado accesible por HTTP/API. Guarda archivos completos dentro de Buckets.",
  },
  {
    id: 102,
    category: "Semana 1",
    front: "S3: Caso de Uso",
    back: "Hosting estático HTML/JS, Data Lakes, copias de seguridad masivas y distribución de multimedia.",
  },
  {
    id: 103,
    category: "Semana 1",
    front: "S3 vs EBS: Gotcha",
    back: "S3 NO es un sistema de archivos en bloques. No puedes instalar un Sistema Operativo ni una BD relacional en S3.",
  },
  {
    id: 104,
    category: "Semana 1",
    front: "S3: Lifecycle Rules (Costes)",
    back: "Mueve objetos automáticamente entre clases de almacenamiento según reglas de antigüedad para reducir gastos.",
  },
  {
    id: 105,
    category: "Semana 1",
    front: "S3: Standard vs Standard-IA",
    back: "Standard: Acceso frecuente. Standard-IA: Acceso infrecuente pero requiere disponibilidad en milisegundos a menor costo de almacenamiento.",
  },
  {
    id: 106,
    category: "Semana 1",
    front: "S3 Glacier: Instant vs Flexible",
    back: "Instant Retrieval: Recuperación en milisegundos. Flexible Retrieval: Recuperación desde minutos hasta horas.",
  },
  {
    id: 107,
    category: "Semana 1",
    front: "S3 Glacier: Deep Archive",
    back: "La clase de almacenamiento más barata de todo AWS. Diseñada para retención a largo plazo (recuperación en 12-48 hrs).",
  },
  {
    id: 108,
    category: "Semana 1",
    front: "S3: Versionamiento",
    back: "Guarda múltiples versiones de un mismo objeto en un bucket para prevenir borrados accidentales o sobrescrituras.",
  },
  {
    id: 109,
    category: "Semana 1",
    front: "S3: Object Lock",
    back: "Modelo WORM (Write Once, Read Many). Impide que los objetos sean borrados o modificados durante un tiempo fijo.",
  },
  {
    id: 110,
    category: "Semana 1",
    front: "S3: Cross-Region Replication (CRR)",
    back: "Copia objetos automáticamente entre buckets de diferentes Regiones de AWS para cumplimiento o baja latencia.",
  },
  {
    id: 111,
    category: "Semana 1",
    front: "EC2: On-Demand Instances",
    back: "Sin pagos por adelantado ni compromiso. Pago por segundo. Ideal para desarrollo y cargas cortas impredecibles.",
  },
  {
    id: 112,
    category: "Semana 1",
    front: "EC2: Reserved Instances (RI)",
    back: "Compromiso de 1 o 3 años para atributos específicos. Descuento de hasta 72% comparado con On-Demand.",
  },
  {
    id: 113,
    category: "Semana 1",
    front: "EC2: Savings Plans",
    back: "Compromiso de gasto $/hora por 1 o 3 años. Otorga descuentos similares a RI con flexibilidad de cambiar de región o familia.",
  },
  {
    id: 114,
    category: "Semana 1",
    front: "EC2: Spot Instances (Caso)",
    back: "Usa capacidad ociosa de AWS con hasta 90% de descuento. Para tareas batch tolerantes a interrupciones.",
  },
  {
    id: 115,
    category: "Semana 1",
    front: "EC2 Spot: Gotcha / Trampa",
    back: "AWS puede interrumpir o reclamar la instancia Spot en cualquier momento enviando una advertencia previa de solo 2 minutos.",
  },
  {
    id: 116,
    category: "Semana 1",
    front: "EC2: Dedicated Hosts",
    back: "Servidor físico dedicado completo. Permite usar licencias de software existentes por socket/core (BYOL).",
  },
  {
    id: 117,
    category: "Semana 1",
    front: "EC2: Dedicated Instances",
    back: "Instancias ejecutadas en hardware dedicado a un único cliente a nivel VPC, sin control sobre sockets/cores.",
  },
  {
    id: 118,
    category: "Semana 1",
    front: "EC2 Auto Scaling: Target Tracking",
    back: "Ajusta automáticamente el número de instancias EC2 para mantener una métrica (ej. mantener CPU al 50%).",
  },
  {
    id: 119,
    category: "Semana 1",
    front: "EBS: Definición & Ámbito",
    back: "Almacenamiento de Bloques (SSD/HDD). Cada volumen EBS pertenece a una sola AZ y se conecta a 1 EC2.",
  },
  {
    id: 120,
    category: "Semana 1",
    front: "EBS: Snapshots",
    back: "Copias de seguridad incrementales de volúmenes EBS que se respaldan automáticamente en Amazon S3.",
  },
  {
    id: 121,
    category: "Semana 1",
    front: "EFS: Definición & Caso",
    back: "Sistema de archivos POSIX/NFS administrado. Se conecta a miles de instancias EC2 simultáneamente en Linux.",
  },
  {
    id: 122,
    category: "Semana 1",
    front: "AWS Storage Gateway",
    back: "Servicio híbrido que conecta aplicaciones locales (on-premises) con el almacenamiento en la nube de AWS.",
  },
  {
    id: 123,
    category: "Semana 1",
    front: "VPC: Definición",
    back: "Red virtual privada aislada lógicamente dentro de la cuenta de AWS para desplegar tus recursos.",
  },
  {
    id: 124,
    category: "Semana 1",
    front: "VPC: Subnet Pública",
    back: "Subred que tiene una ruta configurada explícitamente hacia un Internet Gateway (IGW) para tener acceso a internet.",
  },
  {
    id: 125,
    category: "Semana 1",
    front: "VPC: Subnet Privada",
    back: "Subred sin ruta a internet. Los recursos no son accesibles desde el exterior y requieren NAT Gateway para salir.",
  },
  {
    id: 126,
    category: "Semana 1",
    front: "VPC: Internet Gateway (IGW)",
    back: "Componente de VPC que permite la comunicación bidireccional entre las instancias de la subnet pública e internet.",
  },
  {
    id: 127,
    category: "Semana 1",
    front: "VPC: NAT Gateway",
    back: "Permite que las instancias en subredes privadas se conecten a internet (para parches) sin permitir conexiones entrantes.",
  },
  {
    id: 128,
    category: "Semana 1",
    front: "Security Group: Stateful",
    back: "Firewall a nivel de instancia. Si el tráfico de entrada se aprueba, la respuesta de salida se permite automáticamente.",
  },
  {
    id: 129,
    category: "Semana 1",
    front: "Network ACL (NACL): Stateless",
    back: "Firewall a nivel de subred. Requiere definir reglas explícitas independientes tanto para la entrada como para la salida.",
  },
  {
    id: 130,
    category: "Semana 1",
    front: "VPC Peering",
    back: "Conexión de red directa entre dos VPCs que permite enrutar tráfico usando direcciones IP privadas.",
  },
  {
    id: 131,
    category: "Semana 1",
    front: "Application Load Balancer (ALB)",
    back: "Balanceador de carga en Capa 7 (HTTP/HTTPS). Enruta tráfico basándose en rutas URL, headers o nombres de host.",
  },
  {
    id: 132,
    category: "Semana 1",
    front: "Network Load Balancer (NLB)",
    back: "Balanceador en Capa 4 (TCP/UDP). Diseñado para latencia ultra baja, millones de solicitudes/seg e IPs estáticas.",
  },
  {
    id: 133,
    category: "Semana 1",
    front: "AWS Lambda: Serverless",
    back: "Servicio de cómputo orientado a eventos. Ejecuta código sin aprovisionar servidores y cobra por milisegundo.",
  },
  {
    id: 134,
    category: "Semana 1",
    front: "AWS Lambda: Límite de Tiempo",
    back: "El tiempo máximo continuo de ejecución para una función Lambda es de 15 minutos.",
  },
  {
    id: 135,
    category: "Semana 1",
    front: "Amazon ECS",
    back: "Servicio de orquestación de contenedores Docker nativo de AWS altamente escalable y de alto rendimiento.",
  },
  {
    id: 136,
    category: "Semana 1",
    front: "Amazon EKS",
    back: "Servicio administrado de Kubernetes en AWS para ejecutar aplicaciones en contenedores sin instalar el control plane.",
  },
  {
    id: 137,
    category: "Semana 1",
    front: "AWS Fargate",
    back: "Motor de cómputo Serverless para ECS y EKS. Elimina la necesidad de administrar servidores o clústeres EC2.",
  },
  {
    id: 138,
    category: "Semana 1",
    front: "AWS Elastic Beanstalk",
    back: "Plataforma como Servicio (PaaS). Subes el código y AWS maneja el aprovisionamiento, balanceo y Auto Scaling.",
  },
  {
    id: 139,
    category: "Semana 1",
    front: "Amazon RDS: Definición",
    back: "Servicio administrado para bases de datos relacionales (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server).",
  },
  {
    id: 140,
    category: "Semana 1",
    front: "Amazon RDS: Multi-AZ Deployment",
    back: "Crea una réplica síncrona en otra AZ para alta disponibilidad y conmutación por error (Failover) automática.",
  },
  {
    id: 141,
    category: "Semana 1",
    front: "Amazon RDS: Read Replicas",
    back: "Copia asíncrona de la BD para escalar cargas de trabajo intensivas de LECTURA (Read-heavy).",
  },
  {
    id: 142,
    category: "Semana 1",
    front: "Amazon Aurora",
    back: "Base de datos relacional nativa de AWS. Hasta 5x más rápida que MySQL, con almacenamiento auto-escalable.",
  },
  {
    id: 143,
    category: "Semana 1",
    front: "Amazon DynamoDB",
    back: "Base de datos NoSQL Serverless de clave-valor con latencia garantizada de un solo dígito de milisegundo.",
  },
  {
    id: 144,
    category: "Semana 1",
    front: "Amazon Redshift",
    back: "Data Warehouse relacional (OLAP) diseñado para análisis masivo de datos complejos a escala de Petabytes.",
  },
  {
    id: 145,
    category: "Semana 1",
    front: "Amazon ElastiCache",
    back: "Servicio de caché en memoria administrado (Redis o Memcached) para acelerar lecturas en bases de datos.",
  },
  {
    id: 146,
    category: "Semana 1",
    front: "Amazon Neptune",
    back: "Base de datos de Grafos administrada para aplicaciones que trabajan con relaciones altamente conectadas (redes sociales).",
  },
  {
    id: 147,
    category: "Semana 1",
    front: "Amazon DocumentDB",
    back: "Base de datos de documentos administrada compatible con cargas de trabajo de MongoDB.",
  },
  {
    id: 148,
    category: "Semana 1",
    front: "AWS Batch",
    back: "Ejecuta de forma eficiente cientos de miles de trabajos de procesamiento por lotes utilizando recursos EC2 o Spot.",
  },
  {
    id: 149,
    category: "Semana 1",
    front: "Región vs AZ",
    back: "Región: Zona geográfica aislada. AZ (Availability Zone): Uno o más centros de datos físicos aislados dentro de una Región.",
  },
  {
    id: 150,
    category: "Semana 1",
    front: "AWS Local Zones",
    back: "Extensión de una Región de AWS que coloca cómputo y almacenamiento cerca de grandes centros urbanos.",
  },

  // ==========================================
  // SEMANA 2: SEGURIDAD, IDENTIDAD Y CUMPLIMIENTO (50 TARJETAS)
  // ==========================================
  {
    id: 201,
    category: "Semana 2",
    front: "Responsabilidad Compartida: AWS",
    back: "AWS es responsable de la seguridad DE LA nube (Hardware, Data Centers, parches de hipervisores y red física).",
  },
  {
    id: 202,
    category: "Semana 2",
    front: "Responsabilidad Compartida: Cliente",
    back: "El cliente es responsable de la seguridad EN LA nube (Datos, parches del SO huésped en EC2, IAM y Security Groups).",
  },
  {
    id: 203,
    category: "Semana 2",
    front: "Responsabilidad Compartida: S3 / DynamoDB",
    back: "AWS administra el sistema operativo y parches. El cliente solo gestiona datos, cifrado y políticas de acceso.",
  },
  {
    id: 204,
    category: "Semana 2",
    front: "IAM User",
    back: "Entidad creada en AWS que representa a una persona o aplicación con credenciales de acceso a largo plazo.",
  },
  {
    id: 205,
    category: "Semana 2",
    front: "IAM Group",
    back: "Colección de usuarios de IAM. Permite aplicar políticas de permisos a múltiples usuarios de forma simplificada.",
  },
  {
    id: 206,
    category: "Semana 2",
    front: "IAM Role",
    back: "Identidad con permisos temporales que puede ser asumida por servicios de AWS (ej. EC2) o usuarios federados.",
  },
  {
    id: 207,
    category: "Semana 2",
    front: "IAM Policy",
    back: "Documento JSON que define formalmente los permisos (Allow/Deny) asignados a usuarios, grupos o roles.",
  },
  {
    id: 208,
    category: "Semana 2",
    front: "IAM: Regla de Evaluación",
    back: "Por defecto todo está denegado implícitamente. Un 'Explicit Deny' siempre anula a cualquier 'Allow'.",
  },
  {
    id: 209,
    category: "Semana 2",
    front: "IAM MFA (Multi-Factor Authentication)",
    back: "Capa adicional de seguridad que requiere un código temporal además de la contraseña estándar para iniciar sesión.",
  },
  {
    id: 210,
    category: "Semana 2",
    front: "IAM Root User: Buena Práctica",
    back: "Usar la cuenta Root solo para tareas iniciales. Bloquearla con MFA y NO usarla para tareas administrativas diarias.",
  },
  {
    id: 211,
    category: "Semana 2",
    front: "Principio de Menor Privilegio",
    back: "Otorgar únicamente los permisos estrictamente necesarios para que un usuario o servicio realice su función.",
  },
  {
    id: 212,
    category: "Semana 2",
    front: "AWS Access Keys",
    back: "Combinación de Access Key ID y Secret Access Key usadas para autenticarse mediante CLI, SDKs o APIs de AWS.",
  },
  {
    id: 213,
    category: "Semana 2",
    front: "AWS CloudTrail: Auditoría",
    back: "Registra cada llamada a la API en la cuenta (QUIÉN hizo qué, cuándo y desde qué IP). Es la herramienta de auditoría.",
  },
  {
    id: 214,
    category: "Semana 2",
    front: "Amazon CloudWatch: Monitoreo",
    back: "Supervisa el rendimiento operativo de los recursos (uso de CPU, red, RAM) y recopila logs de aplicaciones.",
  },
  {
    id: 215,
    category: "Semana 2",
    front: "CloudWatch Alarms",
    back: "Inicia acciones automáticas (como notificaciones SNS o auto scaling) cuando una métrica supera un umbral.",
  },
  {
    id: 216,
    category: "Semana 2",
    front: "CloudWatch Logs",
    back: "Servicio para centralizar, monitorear y almacenar archivos de registro de aplicaciones e instancias EC2.",
  },
  {
    id: 217,
    category: "Semana 2",
    front: "AWS Config: Cumplimiento",
    back: "Evalúa y audita continuamente las configuraciones de los recursos de AWS para garantizar el cumplimiento de reglas.",
  },
  {
    id: 218,
    category: "Semana 2",
    front: "Amazon GuardDuty",
    back: "Detección continua e inteligente de amenazas basada en ML mediante el análisis de VPC Flow Logs, DNS y CloudTrail.",
  },
  {
    id: 219,
    category: "Semana 2",
    front: "Amazon Inspector",
    back: "Escáner automático de vulnerabilidades que evalúa software instalado en instancias EC2 e imágenes en ECR.",
  },
  {
    id: 220,
    category: "Semana 2",
    front: "Amazon Macie",
    back: "Servicio de seguridad que usa Machine Learning para descubrir y proteger datos personales (PII) dentro de Amazon S3.",
  },
  {
    id: 221,
    category: "Semana 2",
    front: "AWS WAF (Web Application Firewall)",
    back: "Protege aplicaciones en Capa 7 contra vulnerabilidades web comunes como SQL Injection y Cross-Site Scripting (XSS).",
  },
  {
    id: 222,
    category: "Semana 2",
    front: "AWS Shield Standard",
    back: "Protección gratuita y automática contra ataques DDoS en Capa 3 y 4 activada para todos los clientes de AWS.",
  },
  {
    id: 223,
    category: "Semana 2",
    front: "AWS Shield Advanced",
    back: "Protección DDoS pagada que incluye mitigación avanzada, respuesta 24/7 de un equipo especializado y protección financiera.",
  },
  {
    id: 224,
    category: "Semana 2",
    front: "AWS Network Firewall",
    back: "Firewall administrado para VPC que inspecciona el tráfico de red en las capas 3 a 7 con prevención de intrusiones (IPS).",
  },
  {
    id: 225,
    category: "Semana 2",
    front: "AWS KMS (Key Management Service)",
    back: "Servicio multitenant administrado por AWS para crear y controlar claves criptográficas utilizadas para cifrar datos.",
  },
  {
    id: 226,
    category: "Semana 2",
    front: "AWS CloudHSM",
    back: "Módulo de seguridad de hardware dedicado exclusivo (Single-tenant FIPS 140-2 Nivel 3) administrado por el cliente.",
  },
  {
    id: 227,
    category: "Semana 2",
    front: "AWS Secrets Manager",
    back: "Almacena, rotar, recuperar y administrar credenciales de bases de datos y claves API automáticamente.",
  },
  {
    id: 228,
    category: "Semana 2",
    front: "AWS Systems Manager Parameter Store",
    back: "Almacenamiento seguro e integrado para variables de configuración y cadenas de conexión (gratuito para cadenas estándar).",
  },
  {
    id: 229,
    category: "Semana 2",
    front: "AWS Artifact",
    back: "Portal de autoservicio para descargar informes de auditoría y acuerdos de cumplimiento de AWS (ISO, PCI-DSS, SOC).",
  },
  {
    id: 230,
    category: "Semana 2",
    front: "AWS Trust & Safety Team",
    back: "Equipo de AWS al que se deben reportar abusos o comportamientos maliciosos originados desde direcciones IP de AWS.",
  },
  {
    id: 231,
    category: "Semana 2",
    front: "AWS Security Hub",
    back: "Panel centralizado que consolida alertas de seguridad de servicios como GuardDuty, Inspector y Macie.",
  },
  {
    id: 232,
    category: "Semana 2",
    front: "AWS Audit Manager",
    back: "Automatiza la recopilación de evidencias para evaluar el cumplimiento de marcos normativos (ej. GDPR, HIPAA).",
  },
  {
    id: 233,
    category: "Semana 2",
    front: "Amazon Cognito",
    back: "Administra la autenticación, autorización y gestión de usuarios para aplicaciones móviles y web de cara al cliente final.",
  },
  {
    id: 234,
    category: "Semana 2",
    front: "AWS IAM Identity Center",
    back: "Servicio centralizado para administrar el acceso SSO (Single Sign-On) a múltiples cuentas de AWS y aplicaciones.",
  },
  {
    id: 235,
    category: "Semana 2",
    front: "Cifrado en Transito (In-Transit)",
    back: "Protección de los datos mientras viajan por la red mediante protocolos seguros como HTTPS o TLS.",
  },
  {
    id: 236,
    category: "Semana 2",
    front: "Cifrado en Reposo (At-Rest)",
    back: "Protección de los datos cuando están almacenados en discos o buckets (ej. cifrado SSE-S3 o KMS en EBS).",
  },
  {
    id: 237,
    category: "Semana 2",
    front: "AWS Certificate Manager (ACM)",
    back: "Servicio para aprovisionar, administrar y desplegar certificados SSL/TLS públicos o privados de forma gratuita.",
  },
  {
    id: 238,
    category: "Semana 2",
    front: "Amazon Detective",
    back: "Analiza y visualiza datos de eventos para investigar de forma rápida la causa raíz de posibles problemas de seguridad.",
  },
  {
    id: 239,
    category: "Semana 2",
    front: "AWS RAM (Resource Access Manager)",
    back: "Permite compartir recursos de AWS (como subredes VPC o reglas Route 53) de forma segura entre cuentas.",
  },
  {
    id: 240,
    category: "Semana 2",
    front: "AWS Directory Service",
    back: "Conecta tus recursos de AWS con un Microsoft Active Directory existente en tus instalaciones locales.",
  },
  {
    id: 241,
    category: "Semana 2",
    front: "DDoS Attacks: Capas 3 y 4",
    back: "Inundación de red (ej. SYN Floods o UDP Floods). AWS Shield las mitiga automáticamente.",
  },
  {
    id: 242,
    category: "Semana 2",
    front: "DDoS Attacks: Capa 7",
    back: "Ataques orientados a aplicaciones (ej. peticiones HTTP GET/POST masivas). AWS WAF las bloquea.",
  },
  {
    id: 243,
    category: "Semana 2",
    front: "Penetration Testing en AWS",
    back: "Se permite probar ciertos recursos (EC2, RDS, CloudFront) sin aprobación previa bajo la política de AWS.",
  },
  {
    id: 244,
    category: "Semana 2",
    front: "AWS Root User Credentials",
    back: "Dirección de correo electrónico y contraseña utilizadas para crear la cuenta de AWS. Posee acceso ilimitado.",
  },
  {
    id: 245,
    category: "Semana 2",
    front: "Security Group Limit",
    back: "Es un recurso regional que se asigna directamente a la interfaz de red (ENI) de una instancia.",
  },
  {
    id: 246,
    category: "Semana 2",
    front: "NACL Default Rule",
    back: "La NACL por defecto permite todo el tráfico de entrada y salida; una NACL personalizada bloquea todo por defecto.",
  },
  {
    id: 247,
    category: "Semana 2",
    front: "S3 Public Access Block",
    back: "Mecanismo a nivel de cuenta o bucket para prevenir la exposición pública accidental de datos en S3.",
  },
  {
    id: 248,
    category: "Semana 2",
    front: "AWS Key Rotation",
    back: "AWS KMS permite la rotación automática de claves administradas por AWS una vez al año de forma transparente.",
  },
  {
    id: 249,
    category: "Semana 2",
    front: "IAM Policy Simulator",
    back: "Herramienta para probar y solucionar problemas de permisos de políticas de IAM en un entorno seguro.",
  },
  {
    id: 250,
    category: "Semana 2",
    front: "Amazon CodeGuru Security",
    back: "Herramienta de análisis estático que usa ML para detectar vulnerabilidades en el código fuente de los desarrolladores.",
  },

  // ==========================================
  // SEMANA 3: CONCEPTOS CLOUD, WELL-ARCHITECTED Y FACTURACIÓN (50 TARJETAS)
  // ==========================================
  {
    id: 301,
    category: "Semana 3",
    front: "CapEx (Capital Expenditures)",
    back: "Inversión inicial fija previa en infraestructura física (comprar servidores o data centers locales).",
  },
  {
    id: 302,
    category: "Semana 3",
    front: "OpEx (Operational Expenditures)",
    back: "Gastos operativos continuos ajustados según el consumo en tiempo real. Elimina la inversión inicial.",
  },
  {
    id: 303,
    category: "Semana 3",
    front: "Economías de Escala",
    back: "A medida que millones de clientes usan AWS, AWS reduce sus propios costos operacionales y traslada esos ahorros a los clientes.",
  },
  {
    id: 304,
    category: "Semana 3",
    front: "Beneficio Cloud: Agilidad",
    back: "Capacidad de aprovisionar recursos tecnológicos en cuestión de minutos con solo unos pocos clics.",
  },
  {
    id: 305,
    category: "Semana 3",
    front: "Beneficio Cloud: Alcance Global",
    back: "Desplegar aplicaciones en múltiples Regiones del mundo en pocos minutos para ofrecer baja latencia.",
  },
  {
    id: 306,
    category: "Semana 3",
    front: "Well-Architected: Excelencia Operativa",
    back: "Pilar enfocado en ejecutar y monitorear sistemas para entregar valor de negocio y mejorar continuamente.",
  },
  {
    id: 307,
    category: "Semana 3",
    front: "Well-Architected: Seguridad",
    back: "Pilar centrado en proteger información, sistemas y activos mientras se evalúan los riesgos de negocio.",
  },
  {
    id: 308,
    category: "Semana 3",
    front: "Well-Architected: Fiabilidad (Reliability)",
    back: "Pilar enfocado en la capacidad de un sistema para recuperarse de interrupciones y cumplir con las demandas.",
  },
  {
    id: 309,
    category: "Semana 3",
    front: "Well-Architected: Eficiencia de Rendimiento",
    back: "Pilar centrado en usar eficientemente los recursos informáticos para mantener la eficiencia ante el cambio técnico.",
  },
  {
    id: 310,
    category: "Semana 3",
    front: "Well-Architected: Optimización de Costes",
    back: "Pilar enfocado en evitar gastos innecesarios y entender dónde se está invirtiendo el dinero en la nube.",
  },
  {
    id: 311,
    category: "Semana 3",
    front: "Well-Architected: Sostenibilidad",
    back: "Pilar enfocado en minimizar el impacto ambiental del consumo de energía y recursos de la infraestructura.",
  },
  {
    id: 312,
    category: "Semana 3",
    front: "AWS Pricing Calculator",
    back: "Herramienta web para estimar los costos aproximados de arquitectura ANTES de crear proyectos en AWS.",
  },
  {
    id: 313,
    category: "Semana 3",
    front: "AWS Cost Explorer",
    back: "Herramienta gráfica para analizar, filtrar y visualizar los gastos de AWS PASADOS y hacer proyecciones a futuro.",
  },
  {
    id: 314,
    category: "Semana 3",
    front: "AWS Budgets",
    back: "Establece alertas preventivas personalizadas cuando los costos reales o proyectados superan un presupuesto.",
  },
  {
    id: 315,
    category: "Semana 3",
    front: "AWS Cost & Usage Report (CUR)",
    back: "El informe de facturación más detallado de AWS. Entrega archivos CSV detallados guardados en Amazon S3.",
  },
  {
    id: 316,
    category: "Semana 3",
    front: "AWS Billing Conductor",
    back: "Servicio para estructurar, personalizar y mostrar reportes de facturación internamente a clientes o departamentos.",
  },
  {
    id: 317,
    category: "Semana 3",
    front: "AWS Organizations: Consolidated Billing",
    back: "Combina el uso de múltiples cuentas para alcanzar escalones de volumen con mayores descuentos.",
  },
  {
    id: 318,
    category: "Semana 3",
    front: "Service Control Policies (SCPs)",
    back: "Establecen los límites máximos de permisos que pueden ejecutarse en las cuentas miembros de AWS Organizations.",
  },
  {
    id: 319,
    category: "Semana 3",
    front: "AWS Control Tower",
    back: "Automatiza la creación y gobernanza de un entorno de múltiples cuentas siguiendo las mejores prácticas (Landing Zone).",
  },
  {
    id: 320,
    category: "Semana 3",
    front: "AWS Trusted Advisor",
    back: "Herramienta de diagnóstico que escanea la cuenta y da recomendaciones en 5 áreas (Costes, Seguridad, etc.).",
  },
  {
    id: 321,
    category: "Semana 3",
    front: "Trusted Advisor: Checks Gratuitos",
    back: "Todos los clientes (Basic) tienen acceso a recomendaciones de seguridad básicas y límites de servicio.",
  },
  {
    id: 322,
    category: "Semana 3",
    front: "Trusted Advisor: Full Checks",
    back: "Solo los planes Business y Enterprise tienen acceso al catálogo completo de verificaciones automáticas.",
  },
  {
    id: 323,
    category: "Semana 3",
    front: "Soporte AWS: Basic Plan",
    back: "Gratuito para todos los clientes. Incluye acceso a documentación, foros de soporte y atención a facturación.",
  },
  {
    id: 324,
    category: "Semana 3",
    front: "Soporte AWS: Developer Plan",
    back: "Atención técnica por email en horario laboral. Respuesta en menos de 24h para consultas generales.",
  },
  {
    id: 325,
    category: "Semana 3",
    front: "Soporte AWS: Business Plan",
    back: "Soporte 24/7 vía teléfono, chat y correo. Respuesta en menos de 1 hora para fallos que afectan la producción.",
  },
  {
    id: 326,
    category: "Semana 3",
    front: "Soporte AWS: Enterprise Plan",
    back: "Respuesta <15 min para sistemas de misión crítica caídos + asignación de un TAM (Technical Account Manager).",
  },
  {
    id: 327,
    category: "Semana 3",
    front: "TAM (Technical Account Manager)",
    back: "Asesor técnico dedicado asignado exclusivamente a clientes del plan Enterprise Support.",
  },
  {
    id: 328,
    category: "Semana 3",
    front: "AWS Free Tier: Always Free",
    back: "Servicios con nivel gratuito continuo sin fecha de vencimiento (ej. 1 millón de peticiones en Lambda).",
  },
  {
    id: 329,
    category: "Semana 3",
    front: "AWS Free Tier: 12 Months Free",
    back: "Servicios gratuitos durante los primeros 12 meses tras crear la cuenta (ej. 750 horas de EC2 t2/t3.micro).",
  },
  {
    id: 330,
    category: "Semana 3",
    front: "AWS Free Tier: Trials",
    back: "Pruebas gratuitas a corto plazo que comienzan desde el momento en que se activa un servicio específico.",
  },
  {
    id: 331,
    category: "Semana 3",
    front: "AWS Cost Allocation Tags",
    back: "Etiquetas clave-valor asignadas a recursos para rastrear y categorizar los costos detalladamente por departamento.",
  },
  {
    id: 332,
    category: "Semana 3",
    front: "AWS Marketplace",
    back: "Catálogo digital en línea para comprar, desplegar y gestionar software de terceros listo para usar en AWS.",
  },
  {
    id: 333,
    category: "Semana 3",
    front: "AWS Partner Network (APN)",
    back: "Red global de empresas asociadas que ofrece soluciones tecnológicas e integración profesional en AWS.",
  },
  {
    id: 334,
    category: "Semana 3",
    front: "AWS Professional Services",
    back: "Equipo global de expertos de AWS que ayuda a empresas en proyectos de transformación digital complejos.",
  },
  {
    id: 335,
    category: "Semana 3",
    front: "AWS Knowledge Center",
    back: "Colección oficial de preguntas frecuentes, guías paso a paso y videos explicativos para solucionar dudas.",
  },
  {
    id: 336,
    category: "Semana 3",
    front: "AWS IQ",
    back: "Plataforma que permite contratar a expertos independientes certificados por AWS para trabajos puntuales.",
  },
  {
    id: 337,
    category: "Semana 3",
    front: "AWS Health Dashboard (Personal)",
    back: "Muestra alertas personalizadas y estado sobre los eventos que afectan a TUS recursos específicos.",
  },
  {
    id: 338,
    category: "Semana 3",
    front: "AWS Service Health Dashboard",
    back: "Página pública general que muestra la disponibilidad global de todos los servicios de AWS por Regiones.",
  },
  {
    id: 339,
    category: "Semana 3",
    front: "AWS Service Quotas",
    back: "Servicio centralizado para ver y solicitar aumentos de límites predeterminados de uso en tus cuentas.",
  },
  {
    id: 340,
    category: "Semana 3",
    front: "Alta Disponibilidad (High Availability)",
    back: "Diseño de sistemas que garantiza la continuidad del servicio minimizando el tiempo de inactividad.",
  },
  {
    id: 341,
    category: "Semana 3",
    front: "Tolerancia a Fallos (Fault Tolerance)",
    back: "Capacidad de un sistema de seguir operando correctamente incluso si fallan componentes individuales.",
  },
  {
    id: 342,
    category: "Semana 3",
    front: "Escalabilidad Horizontal",
    back: "Agregar más instancias o nodos del mismo tamaño a un sistema (Auto Scaling en EC2).",
  },
  {
    id: 343,
    category: "Semana 3",
    front: "Escalabilidad Vertical",
    back: "Aumentar la capacidad o tamaño de un servidor existente (ej. cambiar una EC2 t3.micro a t3.large).",
  },
  {
    id: 344,
    category: "Semana 3",
    front: "Elasticidad",
    back: "Capacidad de la nube para aumentar o reducir recursos automáticamente según la fluctuación de la demanda.",
  },
  {
    id: 345,
    category: "Semana 3",
    front: "Descuento por Volumen",
    back: "Principio de precios de AWS donde el costo por unidad disminuye a medida que aumenta el volumen de uso.",
  },
  {
    id: 346,
    category: "Semana 3",
    front: "Pay-as-you-go Pricing",
    back: "Modelo de cobro donde solo pagas por los recursos exactos consumidos sin contratos obligatorios.",
  },
  {
    id: 347,
    category: "Semana 3",
    front: "AWS Compute Optimizer",
    back: "Usa ML para analizar configuraciones de cómputo y recomendar el tamaño adecuado de instancias (Right-sizing).",
  },
  {
    id: 348,
    category: "Semana 3",
    front: "AWS License Manager",
    back: "Administra las licencias de software de terceros para garantizar que no se superen los límites contratados.",
  },
  {
    id: 349,
    category: "Semana 3",
    front: "AWS Well-Architected Tool",
    back: "Herramienta gratuita para evaluar tus arquitecturas contra los 6 pilares del Well-Architected Framework.",
  },
  {
    id: 350,
    category: "Semana 3",
    front: "Consolidated Billing Tax Benefits",
    back: "Permite consolidar impuestos y límites de facturación bajo una sola cuenta pagadora principal (Payer Account).",
  },

  // ==========================================
  // SEMANA 4: MIGRACIÓN, INTEGRACIÓN, MENSAJERÍA Y REDES (50 TARJETAS)
  // ==========================================
  {
    id: 401,
    category: "Semana 4",
    front: "Migración: Rehost (Lift and Shift)",
    back: "Mover aplicaciones a la nube sin realizar cambios en la arquitectura subyacente.",
  },
  {
    id: 402,
    category: "Semana 4",
    front: "Migración: Replatform (Lift and Reshape)",
    back: "Mover apps haciendo optimizaciones mínimas de infraestructura (ej. migrar la BD a RDS sin cambiar la app).",
  },
  {
    id: 403,
    category: "Semana 4",
    front: "Migración: Repurchase (Drop and Shop)",
    back: "Reemplazar un componente o aplicación por un servicio SaaS listo para usar (ej. cambiar a Salesforce).",
  },
  {
    id: 404,
    category: "Semana 4",
    front: "Migración: Refactor / Re-architect",
    back: "Rediseñar la aplicación desde cero para aprovechar las capacidades nativas de la nube (ej. Serverless).",
  },
  {
    id: 405,
    category: "Semana 4",
    front: "Migración: Retain",
    back: "Mantener ciertas aplicaciones en las instalaciones locales porque no están listas para ser migradas.",
  },
  {
    id: 406,
    category: "Semana 4",
    front: "Migración: Retire",
    back: "Desactivar o eliminar aplicaciones que ya no son necesarias para la organización.",
  },
  {
    id: 407,
    category: "Semana 4",
    front: "AWS DMS (Database Migration Service)",
    back: "Migra bases de datos relacionales o NoSQL a AWS con un tiempo de inactividad casi nulo.",
  },
  {
    id: 408,
    category: "Semana 4",
    front: "AWS SCT (Schema Conversion Tool)",
    back: "Convierte esquemas de BD heterogéneas (ej. Oracle a PostgreSQL) para ser usadas en AWS.",
  },
  {
    id: 409,
    category: "Semana 4",
    front: "AWS DataSync",
    back: "Servicio para transferir grandes volúmenes de datos rápidamente entre almacenamiento local y AWS (S3, EFS).",
  },
  {
    id: 410,
    category: "Semana 4",
    front: "AWS Snowcone",
    back: "Dispositivo de la familia Snow ultraportátil de hasta 8 TB para entornos con espacio limitado.",
  },
  {
    id: 411,
    category: "Semana 4",
    front: "AWS Snowball Edge",
    back: "Dispositivo reforzado para transferir hasta 80 TB de datos de forma segura fuera de línea.",
  },
  {
    id: 412,
    category: "Semana 4",
    front: "AWS Snowmobile",
    back: "Camión contenedor de 45 pies diseñado para transferir grandes volúmenes de datos (hasta 100 Petabytes).",
  },
  {
    id: 413,
    category: "Semana 4",
    front: "AWS Application Discovery Service",
    back: "Recopila información de los servidores locales para ayudar a planificar proyectos de migración a la nube.",
  },
  {
    id: 414,
    category: "Semana 4",
    front: "AWS Migration Hub",
    back: "Panel único para monitorear el estado y progreso de las migraciones realizadas con múltiples herramientas.",
  },
  {
    id: 415,
    category: "Semana 4",
    front: "Amazon SQS (Simple Queue Service)",
    back: "Servicio de colas de mensajes desacoplado basado en el modelo Pull para procesar tareas asíncronas.",
  },
  {
    id: 416,
    category: "Semana 4",
    front: "Amazon SNS (Simple Notification Service)",
    back: "Servicio de notificaciones del tipo Publish/Subscribe (Push) que envía mensajes masivos a emails, SMS o HTTP.",
  },
  {
    id: 417,
    category: "Semana 4",
    front: "Amazon EventBridge",
    back: "Bus de eventos Serverless que facilita la conexión entre aplicaciones utilizando datos de SaaS o AWS.",
  },
  {
    id: 418,
    category: "Semana 4",
    front: "AWS Step Functions",
    back: "Orquestador visual Serverless que permite construir workflows coordinando múltiples servicios (como Lambda).",
  },
  {
    id: 419,
    category: "Semana 4",
    front: "AWS AppSync",
    back: "Servicio administrado de GraphQL que simplifica el desarrollo de aplicaciones conectando APIs a bases de datos.",
  },
  {
    id: 420,
    category: "Semana 4",
    front: "AWS CloudFormation: IaC",
    back: "Infraestructura como Código. Aprovisiona recursos de AWS automáticamente mediante plantillas JSON o YAML.",
  },
  {
    id: 421,
    category: "Semana 4",
    front: "AWS CDK (Cloud Development Kit)",
    back: "Marco para definir la infraestructura de la nube utilizando lenguajes de programación conocidos (TypeScript, Python).",
  },
  {
    id: 422,
    category: "Semana 4",
    front: "Amazon CloudFront: CDN",
    back: "Red de distribución de contenido que sirve datos, videos e imágenes a usuarios globales con baja latencia.",
  },
  {
    id: 423,
    category: "Semana 4",
    front: "CloudFront Edge Locations",
    back: "Red global de data centers que almacenan en caché copias de contenido para estar cerca del usuario final.",
  },
  {
    id: 424,
    category: "Semana 4",
    front: "AWS Global Accelerator",
    back: "Usa la red troncal global de AWS para optimizar el enrutamiento del tráfico TCP/UDP mediante IPs Anycast estáticas.",
  },
  {
    id: 425,
    category: "Semana 4",
    front: "AWS Direct Connect",
    back: "Enlace físico dedicado y privado entre el Data Center del cliente y AWS (evita pasar por internet público).",
  },
  {
    id: 426,
    category: "Semana 4",
    front: "AWS Site-to-Site VPN",
    back: "Túnel de red privado y cifrado (IPsec) a través de internet público entre la red local y una VPC.",
  },
  {
    id: 427,
    category: "Semana 4",
    front: "AWS Client VPN",
    back: "Servicio de VPN administrado que permite a trabajadores remotos conectarse de forma segura a redes de AWS.",
  },
  {
    id: 428,
    category: "Semana 4",
    front: "Amazon Route 53: DNS",
    back: "Servicio de DNS (Domain Name System) administrado de alta disponibilidad y escalable.",
  },
  {
    id: 429,
    category: "Semana 4",
    front: "Route 53: Latency Routing",
    back: "Enruta a los usuarios hacia la Región de AWS que proporcione la menor latencia de red.",
  },
  {
    id: 430,
    category: "Semana 4",
    front: "Route 53: Geolocation Routing",
    back: "Enruta el tráfico según la ubicación geográfica física desde donde proviene la solicitud del usuario.",
  },
  {
    id: 431,
    category: "Semana 4",
    front: "Route 53: Failover Routing",
    back: "Redirige el tráfico a un sitio secundario de respaldo en caso de que el sitio primario falle la prueba de salud.",
  },
  {
    id: 432,
    category: "Semana 4",
    front: "AWS Transit Gateway",
    back: "Hub central que simplifica y conecta cientos de VPCs y redes locales en un solo punto.",
  },
  {
    id: 433,
    category: "Semana 4",
    front: "Amazon Kinesis Data Streams",
    back: "Capta y procesa grandes flujos de datos continuos en tiempo real a gran escala (ej. logs o datos IoT).",
  },
  {
    id: 434,
    category: "Semana 4",
    front: "Amazon Kinesis Firehose",
    back: "Carga automáticamente flujos de datos en tiempo real hacia destinos como S3, Redshift o OpenSearch.",
  },
  {
    id: 435,
    category: "Semana 4",
    front: "Amazon MSK (Managed Streaming for Apache Kafka)",
    back: "Servicio totalmente administrado para ejecutar aplicaciones que utilicen Apache Kafka.",
  },
  {
    id: 436,
    category: "Semana 4",
    front: "AWS Glue: ETL",
    back: "Servicio de integración de datos Serverless (Extract, Transform, Load) que prepara datos para análisis.",
  },
  {
    id: 437,
    category: "Semana 4",
    front: "Amazon Athena",
    back: "Servicio de consultas interactivo Serverless que analiza datos guardados en S3 usando SQL estándar.",
  },
  {
    id: 438,
    category: "Semana 4",
    front: "Amazon QuickSight",
    back: "Servicio Serverless de Business Intelligence (BI) para crear paneles y visualizaciones de datos interactivas.",
  },
  {
    id: 439,
    category: "Semana 4",
    front: "AWS Outposts",
    back: "Lleva racks con infraestructura física y servicios de AWS nativos directamente a tu Data Center local.",
  },
  {
    id: 440,
    category: "Semana 4",
    front: "AWS Wavelength",
    back: "Incrusta servicios de AWS dentro de las redes 5G de proveedores de telecomunicaciones para latencia ultra baja.",
  },
  {
    id: 441,
    category: "Semana 4",
    front: "Amazon EMR (Elastic MapReduce)",
    back: "Procesa y analiza grandes volúmenes de datos utilizando marcos de código abierto como Apache Spark y Hadoop.",
  },
  {
    id: 442,
    category: "Semana 4",
    front: "AWS OpenSearch Service",
    back: "Servicio administrado para búsqueda en texto completo, monitoreo de logs y visualización interactiva de datos.",
  },
  {
    id: 443,
    category: "Semana 4",
    front: "AWS OpsWorks",
    back: "Servicio de gestión de configuración que utiliza automatización basada en Chef y Puppet.",
  },
  {
    id: 444,
    category: "Semana 4",
    front: "AWS CodeCommit",
    back: "Servicio de control de versiones administrado y seguro que aloja repositorios privados de Git.",
  },
  {
    id: 445,
    category: "Semana 4",
    front: "AWS CodeBuild",
    back: "Servicio de compilación Serverless que procesa código fuente, ejecuta pruebas y produce paquetes de software.",
  },
  {
    id: 446,
    category: "Semana 4",
    front: "AWS CodeDeploy",
    back: "Automatiza la implementación de código en instancias EC2, Lambda o entornos locales.",
  },
  {
    id: 447,
    category: "Semana 4",
    front: "AWS CodePipeline",
    back: "Servicio de integración y entrega continuas (CI/CD) para automatizar el lanzamiento de aplicaciones.",
  },
  {
    id: 448,
    category: "Semana 4",
    front: "AWS Cloud9",
    back: "Entorno de desarrollo integrado (IDE) basado en la nube que permite escribir y depurar código desde el navegador.",
  },
  {
    id: 449,
    category: "Semana 4",
    front: "AWS X-Ray",
    back: "Ayuda a los desarrolladores a analizar y depurar aplicaciones distribuidas rastreando solicitudes a través de servicios.",
  },
  {
    id: 450,
    category: "Semana 4",
    front: "AWS Mainframe Modernization",
    back: "Herramientas para migrar y modernizar cargas de trabajo legacy de mainframe hacia la nube de AWS.",
  },
];

const QUESTIONS = [
  {
    id: "q1",
    text: "Una empresa planea migrar una base de datos Oracle crítica a Amazon RDS para PostgreSQL. Durante el proceso, necesitan transformar el esquema de la base de datos y luego replicar los datos con un tiempo de inactividad mínimo. ¿Qué combinación de servicios se debe utilizar?",
    options: [
      "AWS DataSync y AWS CloudFormation",
      "AWS Schema Conversion Tool (SCT) y AWS Database Migration Service (DMS)",
      "AWS Snowball Edge y Amazon S3 Glacier",
      "AWS Application Discovery Service y AWS Migration Hub",
    ],
    correct: 1,
    explanation:
      "AWS SCT convierte esquemas entre motores heterogéneos (Oracle a PostgreSQL), mientras que AWS DMS realiza la migración de datos con mínimo tiempo de inactividad.",
  },
  {
    id: "q2",
    text: "Un oficial de cumplimiento requiere que todos los registros de auditoría de llamadas a la API de AWS se almacenen de forma segura y no puedan ser modificados ni eliminados por ningún usuario de IAM. ¿Qué servicio registra estas llamadas y cómo se asegura su integridad en S3?",
    options: [
      "Amazon CloudWatch Logs con reglas de EventBridge",
      "AWS CloudTrail guardando logs en un bucket S3 con S3 Object Lock habilitado",
      "AWS Config guardando informes en EBS con cifrado KMS",
      "Amazon GuardDuty enviando alertas directas a AWS Artifact",
    ],
    correct: 1,
    explanation:
      "AWS CloudTrail audita las llamadas API de la cuenta. Para garantizar la inmutabilidad (WORM), los registros se guardan en S3 utilizando S3 Object Lock.",
  },
  {
    id: "q3",
    text: "Una compañía necesita procesar archivos cargados por usuarios. La carga debe desencadenar un procesamiento inmediato en milisegundos sin mantener servidores encendidos en espera. ¿Qué arquitectura cumple mejor este requisito optimizando costos?",
    options: [
      "Instancias EC2 Reserved ejecutándose de forma continua",
      "Carga a Amazon S3 desencadenando un evento directo hacia AWS Lambda",
      "Instancias EC2 Spot detrás de un Network Load Balancer",
      "Un clúster de Amazon EMR con escalado automático",
    ],
    correct: 1,
    explanation:
      "Amazon S3 integrado con AWS Lambda es una solución Serverless basada en eventos donde solo pagas por la ejecución durante los milisegundos requeridos.",
  },
  {
    id: "q4",
    text: "Según el Modelo de Responsabilidad Compartida de AWS, ¿cuál de las siguientes tareas es responsabilidad EXCLUSIVA de AWS cuando se utiliza Amazon RDS?",
    options: [
      "Configurar las reglas del Security Group de la base de datos",
      "Crear y optimizar los índices de las tablas",
      "Aplicar parches al sistema operativo subyacente y al motor de la BD",
      "Gestionar los permisos de acceso de los usuarios de la base de datos",
    ],
    correct: 2,
    explanation:
      "RDS es un servicio gestionado donde AWS aplica los parches al sistema operativo y al motor de base de datos. El cliente maneja datos y Security Groups.",
  },
  {
    id: "q5",
    text: "Una empresa requiere consolidar la facturación de 15 cuentas de AWS independientes para aprovechar descuentos por volumen y aplicar políticas de control de acceso centralizadas (SCPs). ¿Qué herramienta habilita esto?",
    options: [
      "AWS IAM Identity Center",
      "AWS Organizations",
      "AWS Cost Explorer",
      "AWS Control Tower",
    ],
    correct: 1,
    explanation:
      "AWS Organizations agrupa cuentas bajo una facturación consolidada y aplica Service Control Policies (SCPs) para limitar permisos a nivel organizacional.",
  },
  {
    id: "q6",
    text: "Un desarrollador quiere recibir una alerta inmediata si los costos mensuales proyectados de la cuenta superan los $500 USD. ¿Qué herramienta debe configurar?",
    options: [
      "AWS Pricing Calculator",
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Cost & Usage Report (CUR)",
    ],
    correct: 2,
    explanation:
      "AWS Budgets establece umbrales personalizados y notifica cuando los costos reales o proyectados superan el límite fijado.",
  },
  {
    id: "q7",
    text: "Una aplicación requiere almacenar archivos de usuario a los que se accede con frecuencia durante los primeros 30 días, pero raramente después. Sin embargo, los archivos deben estar disponibles en milisegundos si se solicitan. ¿Cuál es la estrategia de almacenamiento más rentable?",
    options: [
      "Guardar todo en S3 Standard",
      "Configurar una Lifecycle Policy de S3 Standard a S3 Standard-IA a los 30 días",
      "Mover los datos a S3 Glacier Flexible Retrieval inmediatamente",
      "Guardar los archivos en volúmenes EBS de tipo gp3",
    ],
    correct: 1,
    explanation:
      "S3 Standard-IA ofrece disponibilidad en milisegundos a un costo de almacenamiento menor que S3 Standard para datos poco consultados tras 30 días.",
  },
  {
    id: "q8",
    text: "Una empresa desea ejecutar una carga de trabajo de análisis masivo de datos que puede pausarse y reanudarse en cualquier momento sin perder progreso. ¿Qué modelo de precios de EC2 ofrece la mayor reducción de costos?",
    options: [
      "On-Demand Instances",
      "Spot Instances",
      "Reserved Instances",
      "Dedicated Hosts",
    ],
    correct: 1,
    explanation:
      "Las instancias Spot ofrecen hasta 90% de descuento aprovechando capacidad ociosa de AWS, siendo ideales para cargas tolerantes a interrupciones.",
  },
  {
    id: "q9",
    text: "¿Qué servicio es un escáner automatizado de vulnerabilidades de software que evalúa instancias EC2 e imágenes en Amazon ECR en busca de fallos de seguridad (CVEs)?",
    options: [
      "Amazon GuardDuty",
      "Amazon Macie",
      "Amazon Inspector",
      "AWS Security Hub",
    ],
    correct: 2,
    explanation:
      "Amazon Inspector revisa automáticamente las cargas de trabajo en EC2 y ECR para detectar vulnerabilidades de software y fallos de configuración.",
  },
  {
    id: "q10",
    text: "Una startup requiere soporte técnico con respuesta garantizada menor a 15 minutos para eventos de misión crítica y la asistencia personalizada de un Technical Account Manager (TAM). ¿Qué plan de soporte deben contratar?",
    options: [
      "Basic Support Plan",
      "Developer Support Plan",
      "Business Support Plan",
      "Enterprise Support Plan",
    ],
    correct: 3,
    explanation:
      "El plan Enterprise incluye tiempo de respuesta <15 min para sistemas caídos críticos y asigna un TAM (Technical Account Manager) dedicado.",
  },
  {
    id: "q11",
    text: "¿Qué servicio de red de AWS proporciona una conexión de red privada física y dedicada desde las instalaciones del cliente (on-premises) hacia AWS, evitando pasar por el internet público?",
    options: [
      "AWS Site-to-Site VPN",
      "Amazon Route 53",
      "AWS Direct Connect",
      "Amazon CloudFront",
    ],
    correct: 2,
    explanation:
      "AWS Direct Connect establece una conexión de red privada dedicada entre tus instalaciones locales y AWS, garantizando alta velocidad y privacidad sin usar internet.",
  },
  {
    id: "q12",
    text: "Una arquitectura de microservicios necesita desacoplar componentes utilizando una cola de mensajes donde los receptores procesan y eliminan los mensajes de la cola (patrón Pull). ¿Qué servicio debe implementarse?",
    options: [
      "Amazon SNS",
      "Amazon SQS",
      "Amazon EventBridge",
      "AWS Step Functions",
    ],
    correct: 1,
    explanation:
      "Amazon SQS (Simple Queue Service) es un servicio de colas desacoplado basado en el modelo Pull que garantiza el procesamiento seguro de tareas asíncronas.",
  },
];

// ==========================================
// 2. COMPONENTES PRINCIPALES DE LA APP
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [planProgress, setPlanProgress] = useState(
    () => JSON.parse(localStorage.getItem("aws_plan")) || [],
  );
  const [mistakesBank, setMistakesBank] = useState(
    () => JSON.parse(localStorage.getItem("aws_mistakes")) || [],
  );

  useEffect(() => {
    localStorage.setItem("aws_plan", JSON.stringify(planProgress));
  }, [planProgress]);
  useEffect(() => {
    localStorage.setItem("aws_mistakes", JSON.stringify(mistakesBank));
  }, [mistakesBank]);

  const toggleTask = (taskId) => {
    setPlanProgress((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Target className="text-blue-500 w-8 h-8" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent hidden sm:block">
              AWS CLF-C02 Pro
            </h1>
          </div>
          <div className="flex gap-1 sm:gap-3 overflow-x-auto">
            <NavBtn
              icon={<Home />}
              label="Panel"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavBtn
              icon={<CheckCircle />}
              label="Plan"
              active={activeTab === "plan"}
              onClick={() => setActiveTab("plan")}
            />
            <NavBtn
              icon={<BookOpen />}
              label="Tarjetas"
              active={activeTab === "flashcards"}
              onClick={() => setActiveTab("flashcards")}
            />
            <NavBtn
              icon={<Brain />}
              label="Simulador"
              active={activeTab === "quiz"}
              onClick={() => setActiveTab("quiz")}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 py-8">
        {activeTab === "dashboard" && (
          <DashboardView
            planProgress={planProgress}
            mistakesBank={mistakesBank}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "plan" && (
          <StudyPlanView planProgress={planProgress} toggleTask={toggleTask} />
        )}
        {activeTab === "flashcards" && <FlashcardsView />}
        {activeTab === "quiz" && (
          <QuizEngine
            questions={QUESTIONS}
            mistakesBank={mistakesBank}
            setMistakesBank={setMistakesBank}
            mode="full"
          />
        )}
        {activeTab === "mistakes" && (
          <QuizEngine
            questions={QUESTIONS.filter((q) => mistakesBank.includes(q.id))}
            mistakesBank={mistakesBank}
            setMistakesBank={setMistakesBank}
            mode="mistakes"
            onEmpty={() => setActiveTab("dashboard")}
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// 3. VISTAS SECUNDARIAS
// ==========================================

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active ? "bg-blue-600/20 text-blue-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function DashboardView({ planProgress, mistakesBank, setActiveTab }) {
  const totalTasks = STUDY_PLAN.reduce(
    (acc, week) => acc + week.tasks.length,
    0,
  );
  const progressPercent =
    Math.round((planProgress.length / totalTasks) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">¡Hola, Ingeniero!</h2>
        <p className="text-gray-400 mb-6">
          Tu panel de preparación intensiva para AWS Certified Cloud
          Practitioner:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Progreso del Plan</span>
              <span className="text-blue-400 font-bold">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
            <div>
              <span className="text-gray-400 block mb-1">Banco de Errores</span>
              <span className="text-2xl font-bold text-red-400">
                {mistakesBank.length}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                preguntas por corregir
              </span>
            </div>
            {mistakesBank.length > 0 && (
              <button
                onClick={() => setActiveTab("mistakes")}
                className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
              >
                Repasar Errores
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab("flashcards")}
          className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-blue-500 transition group text-left flex items-start justify-between"
        >
          <div>
            <BookOpen className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg mb-1">
              Mazo Completo ({FLASHCARDS.length} Tarjetas)
            </h3>
            <p className="text-sm text-gray-500">
              50 Tarjetas exactas por semana (Definición, Caso, Gotcha, Coste).
            </p>
          </div>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">
            200 High-Yield
          </span>
        </button>

        <button
          onClick={() => setActiveTab("quiz")}
          className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-purple-500 transition group text-left flex items-start justify-between"
        >
          <div>
            <Brain className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg mb-1">
              Simulador de Escenarios ({QUESTIONS.length})
            </h3>
            <p className="text-sm text-gray-500">
              Preguntas extensas de examen con puntaje oficial AWS (1000 pts).
            </p>
          </div>
          <span className="bg-purple-500/10 text-purple-400 text-xs font-semibold px-2.5 py-1 rounded-full">
            Examen
          </span>
        </button>
      </div>
    </div>
  );
}

function StudyPlanView({ planProgress, toggleTask }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Plan de Estudio a 4 Semanas</h2>
      {STUDY_PLAN.map((week, idx) => (
        <div
          key={idx}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-blue-400 mb-4">{week.week}</h3>
          <div className="space-y-3">
            {week.tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={planProgress.includes(task.id)}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span
                  className={`text-gray-300 group-hover:text-white transition ${planProgress.includes(task.id) ? "line-through text-gray-600" : ""}`}
                >
                  {task.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlashcardsView() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const categories = ["Todas", "Semana 1", "Semana 2", "Semana 3", "Semana 4"];

  const filteredCards =
    selectedCategory === "Todas"
      ? FLASHCARDS
      : FLASHCARDS.filter((c) => c.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveCard(0);
    setFlipped(false);
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => setActiveCard((p) => (p + 1) % filteredCards.length), 150);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(
      () =>
        setActiveCard(
          (p) => (p - 1 + filteredCards.length) % filteredCards.length,
        ),
      150,
    );
  };

  const shuffleCards = () => {
    setFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setActiveCard(randomIndex);
  };

  const currentCard = filteredCards[activeCard] || FLASHCARDS[0];

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Tarjetas de Repaso (50 por semana)
          </h2>
          <p className="text-sm text-gray-400">
            Desglose multi-ángulo para dominar los 4 dominios
          </p>
        </div>

        <button
          onClick={shuffleCards}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg border border-gray-700 transition"
        >
          <Shuffle className="w-4 h-4 text-blue-400" /> Aleatorio
        </button>
      </div>

      <div className="w-full flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {cat === "Todas"
              ? `Todas (${FLASHCARDS.length})`
              : `${cat} (${FLASHCARDS.filter((c) => c.category === cat).length})`}
          </button>
        ))}
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="w-full h-96 bg-gray-900 border border-gray-800 rounded-3xl p-8 cursor-pointer relative transition-all duration-300 hover:border-blue-500 shadow-2xl flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {currentCard.category}
          </span>
          <span className="text-xs font-semibold text-gray-500">
            {flipped
              ? "REVERSO (Concepto / Respuesta)"
              : "FRENTE (Pregunta / Escenario)"}
          </span>
        </div>

        <div className="my-auto text-center px-4">
          {!flipped ? (
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentCard.front}
              </h3>
              <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest font-mono">
                Haz clic o toca para girar
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-normal">
                {currentCard.back}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-800/80 pt-4">
          <span>AWS CLF-C02 Master Deck</span>
          <span>
            Tarjeta {activeCard + 1} de {filteredCards.length}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={prevCard}
          className="px-6 py-3 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-200 rounded-xl font-medium transition"
        >
          Anterior
        </button>
        <button
          onClick={nextCard}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

function QuizEngine({
  questions,
  mistakesBank,
  setMistakesBank,
  mode,
  onEmpty,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">¡Banco de Errores Vacío!</h2>
        <p className="text-gray-400 mt-2 mb-6">
          Has repasado y corregido todos tus fallos previos.
        </p>
        <button
          onClick={onEmpty}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Volver al Panel
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);

    if (idx === q.correct) {
      setScore((s) => s + 1);
      if (mode === "mistakes") {
        setMistakesBank((prev) => prev.filter((id) => id !== q.id));
      }
    } else {
      if (!mistakesBank.includes(q.id)) {
        setMistakesBank((prev) => [...prev, q.id]);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const finalScore = Math.round((score / questions.length) * 1000);
    const passed = finalScore >= 700;

    return (
      <div className="max-w-2xl mx-auto text-center py-10 bg-gray-900 border border-gray-800 rounded-3xl p-8">
        {passed ? (
          <Target className="w-24 h-24 text-green-500 mx-auto mb-6" />
        ) : (
          <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6" />
        )}
        <h2 className="text-3xl font-bold mb-2">Simulación Completada</h2>
        <p className="text-gray-400 mb-8">
          {mode === "mistakes"
            ? "Repaso de errores finalizado"
            : "Este puntaje simula la escala real de AWS (700 pts requeridos)"}
        </p>
        <div
          className={`text-6xl font-black mb-4 ${passed ? "text-green-500" : "text-red-500"}`}
        >
          {finalScore} <span className="text-2xl text-gray-500">/ 1000</span>
        </div>
        <p className="text-xl mb-8 font-medium">
          {passed
            ? "¡Aprobado! Estás en la franja segura de aprobación."
            : "Puntaje insuficiente (Mínimo 700). Revisa el Banco de Errores."}
        </p>

        <button
          onClick={restartQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition"
        >
          <RefreshCw className="w-5 h-5" /> Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-gray-400 bg-gray-900 px-3 py-1 rounded-lg">
          Pregunta {currentIdx + 1} de {questions.length}
        </span>
        {mode === "mistakes" && (
          <span className="text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-lg">
            Modo: Banco de Errores
          </span>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-10 mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold leading-relaxed mb-8">
          {q.text}
        </h3>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let btnClass =
              "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
            if (!showExplanation) {
              btnClass +=
                selected === idx
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800 hover:border-gray-500";
            } else {
              if (idx === q.correct)
                btnClass += "border-green-500 bg-green-500/10 text-green-100";
              else if (selected === idx)
                btnClass += "border-red-500 bg-red-500/10 text-red-100";
              else btnClass += "border-gray-800 bg-gray-900 opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showExplanation}
                className={btnClass}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                    ${showExplanation && idx === q.correct ? "border-green-500 bg-green-500 text-white" : "border-gray-500"}`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {opt}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className="animate-fade-in-up bg-blue-900/20 border border-blue-800/50 rounded-2xl p-6 mb-6">
          <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Target className="w-5 h-5" /> Explicación Técnica
          </h4>
          <p className="text-gray-300 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!showExplanation}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${showExplanation ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
        >
          {currentIdx + 1 === questions.length
            ? "Ver Resultados"
            : "Siguiente Pregunta"}{" "}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
