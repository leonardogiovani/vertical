import React, { useState, useEffect, useRef } from 'react';
import { FeedItem } from '../components/feed/FeedItem';
import { TopBar } from '../components/layout/TopBar';
import './Home.css';

const MOCK_FEED = [
  {
    id: 1,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
    poster: 'https://images.unsplash.com/photo-1555685812-4b943f3e9942?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '1.2k',
    comments: '234',
    shares: '89',
    description: 'Preciso de ajuda para cirurgia... #ajuda #saude',
    fullDescription: 'Preciso de ajuda para cirurgia de emergência. Minha situação é delicada e qualquer contribuição faz diferença. Muito obrigado a todos que puderem ajudar nesta missão de solidariedade. #ajuda #saude #cirurgia #emergencia',
    tags: ['ajuda', 'saude', 'cirurgia'],
    music: 'Som: Música Inspiradora',
    user: {
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 2,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    poster: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '4.5k',
    comments: '567',
    shares: '1.2k',
    description: 'Ajude a reconstruir nossa escola comunitária! 🏫',
    fullDescription: 'Nossa escola comunitária foi danificada pelas chuvas e precisamos de sua ajuda para reconstruir e oferecer educação de qualidade para nossas crianças. Cada contribuição nos ajuda a construir um futuro melhor. #educacao #comunidade #futuro #escola',
    tags: ['educacao', 'comunidade', 'futuro'],
    music: 'Som: Hope for Tomorrow',
    user: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 3,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
    poster: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '892',
    comments: '45',
    shares: '120',
    description: 'Campanha de alimentos para o Natal 🎄🎅',
    fullDescription: 'Estamos arrecadando alimentos para famílias carentes neste Natal. Junte-se a nós nessa campanha de solidariedade e ajude a tornar o Natal especial para quem mais precisa. #natal #solidariedade #fomezero #doacao',
    tags: ['natal', 'solidariedade', 'fomezero'],
    music: 'Som: Jingle Bells Rock',
    user: {
      name: 'Projeto Viver',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  // 12 novos posts adicionais
  {
    id: 4,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '2.3k',
    comments: '156',
    shares: '89',
    description: 'Cirurgia de emergência para meu filho 💔',
    fullDescription: 'Meu filho precisa de uma cirurgia de emergência e não tenho condições financeiras para pagar. Ele é tudo para mim e estou desesperada. Por favor, ajude-nos a salvar meu pequeno. Qualquer quantia é bem-vinda. #emergencia #saude #filho #amor',
    tags: ['emergencia', 'saude', 'filho'],
    music: 'Som: Oração pela Vida',
    user: {
      name: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 5,
    type: 'article',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '567',
    comments: '89',
    shares: '45',
    description: 'Ajuda para tratamento de câncer - Minha história de luta',
    fullDescription: 'Meu nome é Carlos e estou lutando contra o câncer há 2 anos. As despesas médicas estão acumulando e preciso de ajuda para continuar o tratamento. Compartilho minha história para conscientizar e pedir apoio da comunidade. Cada doação, por menor que seja, me ajuda a continuar lutando. #cancer #luta #esperanca #saude',
    tags: ['cancer', 'luta', 'esperanca'],
    music: 'Som: Strength to Carry On',
    user: {
      name: 'Carlos Lima',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 6,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-seeing-a-patient-reception-4151-large.mp4',
    poster: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '1.8k',
    comments: '234',
    shares: '156',
    description: 'Consultas médicas para comunidade carente',
    fullDescription: 'Estamos organizando um mutirão de consultas médicas gratuitas para a comunidade carente. Precisamos de recursos para medicamentos e materiais médicos. Sua ajuda pode salvar vidas! Junte-se a nós nessa missão de amor e solidariedade. #saude #comunidade #medicina #solidariedade',
    tags: ['saude', 'comunidade', 'medicina'],
    music: 'Som: Cura e Esperança',
    user: {
      name: 'Dra. Fernanda',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 7,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '3.2k',
    comments: '445',
    shares: '267',
    description: 'Casa queimada - Precisamos reconstruir nosso lar',
    fullDescription: 'Nossa casa pegou fogo e perdemos tudo. Estamos desesperados precisando reconstruir nosso lar. Temos 3 filhos pequenos e estamos morando de favor. Pedimos ajuda da comunidade para reconstruir nossa vida. Qualquer ajuda é bem-vinda - materiais, móveis, roupas ou recursos financeiros. #incendio #lar #familia #reconstrucao',
    tags: ['incendio', 'lar', 'familia'],
    music: 'Som: Recomeçar',
    user: {
      name: 'Família Silva',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 8,
    type: 'article',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '892',
    comments: '123',
    shares: '67',
    description: 'Tratamento para autismo - O diagnóstico que mudou nossa vida',
    fullDescription: 'Nosso filho foi diagnosticado com autismo e o tratamento especializado é muito caro. Estamos lutando para dar a ele o melhor cuidado possível. A terapia ABA está fazendo muita diferença em seu desenvolvimento, mas os custos são altos. Pedimos ajuda para continuar esse tratamento tão importante. #autismo #terapia #filho #amor',
    tags: ['autismo', 'terapia', 'filho'],
    music: 'Som: Caminho da Esperança',
    user: {
      name: 'Mãe Coragem',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 9,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-father-and-son-playing-in-a-toy-car-4019-large.mp4',
    poster: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '1.5k',
    comments: '189',
    shares: '98',
    description: 'Brinquedos para crianças carentes - Natal de esperança',
    fullDescription: 'Estamos arrecadando brinquedos para crianças carentes neste Natal. Nenhuma criança deve ficar sem um presente no Natal! Vamos juntos espalhar alegria e esperança. Precisamos de brinquedos novos ou usados em bom estado. #natal #criancas #brinquedos #solidariedade',
    tags: ['natal', 'criancas', 'brinquedos'],
    music: 'Som: Natal Feliz',
    user: {
      name: 'Papai Noel Solidário',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 10,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '2.8k',
    comments: '334',
    shares: '178',
    description: 'Cirurgia bariátrica - Uma nova chance para viver',
    fullDescription: 'Após anos de luta contra a obesidade, finalmente consegui autorização para cirurgia bariátrica, mas preciso de ajuda para custear parte do procedimento e acompanhamento pós-cirúrgico. Esta cirurgia pode salvar minha vida! #bariatrica #saude #vida #transformacao',
    tags: ['bariatrica', 'saude', 'vida'],
    music: 'Som: Nova Vida',
    user: {
      name: 'Maria da Esperança',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 11,
    type: 'article',
    image: 'https://images.unsplash.com/photo-1516775080506-8b3d7c0f1698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '1.1k',
    comments: '167',
    shares: '89',
    description: 'Ajuda para o tratamento de Parkinson do meu pai',
    fullDescription: 'Meu pai foi diagnosticado com Parkinson há 2 anos e as despesas com medicamentos e fisioterapia estão pesando muito na família. Precisamos de ajuda para continuar o tratamento que melhora significativamente sua qualidade de vida. É difícil ver meu herói enfrentando essa doença. #parkinson #pai #tratamento #familia',
    tags: ['parkinson', 'pai', 'tratamento'],
    music: 'Som: Força Familiar',
    user: {
      name: 'Filho Amoroso',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 12,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-posing-in-a-spring-garden-492-large.mp4',
    poster: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '3.5k',
    comments: '445',
    shares: '234',
    description: 'Vestidos de formatura para jovens talentosas',
    fullDescription: 'Estamos arrecadando vestidos de formatura para jovens talentosas que não têm condições de comprar. Cada menina merece sentir-se linda no dia da formatura! Vamos juntos realizar sonhos e transformar vidas. Precisamos de vestidos tamanhos diversos. #formatura #jovens #vestidos #sonhos',
    tags: ['formatura', 'jovens', 'vestidos'],
    music: 'Som: Sonhos de Princesa',
    user: {
      name: 'Conto de Fadas Real',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 13,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '2.2k',
    comments: '278',
    shares: '156',
    description: 'Tratamento de fertilização - Realizando o sonho da maternidade',
    fullDescription: 'Após 8 anos tentando engravidar, finalmente consegui iniciar o tratamento de fertilização in vitro, mas os custos são muito altos. Esta é nossa última chance de realizar o sonho de ser mãe. Pedimos ajuda para completar o tratamento. #fertilizacao #maternidade #sonho #tratamento',
    tags: ['fertilizacao', 'maternidade', 'sonho'],
    music: 'Som: Milagre da Vida',
    user: {
      name: 'Maria da Graça',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 14,
    type: 'article',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '1.9k',
    comments: '223',
    shares: '134',
    description: 'Acidente de moto - Preciso de prótese para andar novamente',
    fullDescription: 'Tive um acidente de moto grave e perdi a perna. Preciso de uma prótese de qualidade para poder andar novamente e voltar ao trabalho. Estou desesperado pois não tenho recursos para pagar. Sua ajuda pode me dar uma nova chance de ter uma vida normal. #acidente #protese #reabilitacao #vida',
    tags: ['acidente', 'protese', 'reabilitacao'],
    music: 'Som: Andando com Esperança',
    user: {
      name: 'Renato da Silva',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 15,
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-guitar-489-large.mp4',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '4.2k',
    comments: '567',
    shares: '345',
    description: 'Instrumentos musicais para orfanato - Música transforma vidas',
    fullDescription: 'Nosso orfanato está criando uma banda musical para ajudar as crianças a se expressarem e superarem traumas. Precisamos de instrumentos musicais - qualquer um que você puder doar. A música tem poder de cura e transformação. Ajude-nos a criar futuros músicos! #musica #orfanato #criancas #transformacao',
    tags: ['musica', 'orfanato', 'criancas'],
    music: 'Som: Melodia da Esperança',
    user: {
      name: 'Maestro do Bem',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  }
];

const Home = () => {
  const [activeVideoId, setActiveVideoId] = useState(MOCK_FEED[0].id);
  const feedRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.dataset.id);
          setActiveVideoId(id);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.feed-item-wrapper');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-home">
      <TopBar transparent title="Vertical" />
      <div className="feed-container no-scrollbar" ref={feedRef}>
        {MOCK_FEED.map(item => (
          <div 
            key={item.id} 
            className="feed-item-wrapper"
            data-id={item.id}
          >
            <FeedItem 
              data={item} 
              isActive={activeVideoId === item.id} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
