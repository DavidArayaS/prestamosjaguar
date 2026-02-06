const translations = {
  es: {
    navHome: 'Inicio',
    navExperience: 'Experiencia',
    navCalc: 'Calculadora',
    navForm: 'Solicitud',
    navTestimonials: 'Testimonios',
    heroKicker: 'Prestamos con garantia hipotecaria',
    heroTitle: 'Dinero rapido, tasas competitivas y poco papeleo',
    heroText:
      'Prestamos Jaguar tiene anos en el mercado ayudando a personas y negocios a obtener liquidez con evaluaciones rapidas y acompanamiento real.',
    heroCtaApply: 'Solicitar ahora',
    heroCtaCalc: 'Calcular cuota',
    heroPanelTitle: 'Resumen financiero',
    heroMetric1Label: 'Trayectoria',
    heroMetric1Value: '+15 anos',
    heroMetric2Label: 'Respuesta inicial',
    heroMetric2Value: '24h',
    heroMetric3Label: 'Atencion',
    heroMetric3Value: 'Personalizada',
    heroMetric4Label: 'Proceso',
    heroMetric4Value: 'Simple',
    trustTitle1: 'Experiencia real',
    trustText1: 'Anos en el mercado financiando con respaldo hipotecario.',
    trustTitle2: 'Poco papeleo',
    trustText2: 'Proceso agil para clientes que necesitan velocidad y claridad.',
    trustTitle3: 'Tasas competitivas',
    trustText3: 'Condiciones transparentes adaptadas a cada perfil financiero.',
    calcTitle: 'Calculadora de credito',
    calcText: 'Estima tu cuota mensual y toma una decision informada.',
    calcAmount: 'Monto del prestamo (USD)',
    calcRate: 'Tasa anual (%)',
    calcYears: 'Plazo (anos)',
    calcButton: 'Calcular',
    calcApply: 'Aplicar con este monto',
    resultLabel: 'Cuota mensual estimada',
    resultTotal: 'Total a pagar',
    resultInterest: 'Interes total',
    resultDisclaimer: 'Esta calculadora es informativa y no sustituye una oferta formal.',
    formTitle: 'Solicitud de prestamo hipotecario',
    formText: 'Completa este formulario y enviaremos tu caso para evaluacion. Te contactamos por telefono.',
    fName: 'Nombre completo',
    fId: 'Numero de cedula',
    fPhoneMain: 'Telefono principal',
    fPhoneSec: 'Telefono secundario',
    fEmail: 'Correo electronico',
    fAmount: 'Cantidad solicitada (USD)',
    fPropertyType: 'Tipo de propiedad a hipotecar',
    fSelect: 'Seleccionar',
    fHouse: 'Casa',
    fApartment: 'Apartamento',
    fLand: 'Terreno',
    fCommercial: 'Comercial',
    fPropertySize: 'Tamano de la propiedad',
    fFiscal: 'Valor fiscal de la propiedad (USD)',
    fLocation: 'Ubicacion de la propiedad',
    fIncome: 'Ingreso mensual aproximado (USD)',
    fDebts: 'Deudas actuales',
    fNotes: 'Comentarios adicionales',
    formSubmit: 'Enviar solicitud',
    formSending: 'Enviando solicitud...',
    formSuccess: 'Solicitud enviada correctamente. Te contactaremos pronto.',
    formError: 'No se pudo enviar. Revisa los datos o la configuracion del servidor.',
    testTitle: 'Testimonios',
    testText: 'Experiencias de clientes que valoraron la rapidez y el trato humano.'
  },
  en: {
    navHome: 'Home',
    navExperience: 'Experience',
    navCalc: 'Calculator',
    navForm: 'Application',
    navTestimonials: 'Testimonials',
    heroKicker: 'Property-backed lending',
    heroTitle: 'Fast funding, competitive rates, and minimal paperwork',
    heroText:
      'Prestamos Jaguar has years in the market helping individuals and businesses access liquidity with fast evaluations and real support.',
    heroCtaApply: 'Apply now',
    heroCtaCalc: 'Calculate payment',
    heroPanelTitle: 'Financial snapshot',
    heroMetric1Label: 'Track record',
    heroMetric1Value: '+15 years',
    heroMetric2Label: 'Initial response',
    heroMetric2Value: '24h',
    heroMetric3Label: 'Service',
    heroMetric3Value: 'Personalized',
    heroMetric4Label: 'Process',
    heroMetric4Value: 'Simple',
    trustTitle1: 'Proven experience',
    trustText1: 'Years in the market delivering property-backed funding.',
    trustTitle2: 'Minimal paperwork',
    trustText2: 'A streamlined process for clients that need speed and clarity.',
    trustTitle3: 'Competitive rates',
    trustText3: 'Transparent terms adapted to each financial profile.',
    calcTitle: 'Loan calculator',
    calcText: 'Estimate your monthly payment and make an informed decision.',
    calcAmount: 'Loan amount (USD)',
    calcRate: 'Annual rate (%)',
    calcYears: 'Term (years)',
    calcButton: 'Calculate',
    calcApply: 'Apply with this amount',
    resultLabel: 'Estimated monthly payment',
    resultTotal: 'Total payment',
    resultInterest: 'Total interest',
    resultDisclaimer: 'This calculator is informational and not a formal offer.',
    formTitle: 'Mortgage loan application',
    formText: 'Complete this form and we will send your case for review. We will contact you by phone.',
    fName: 'Full name',
    fId: 'ID number',
    fPhoneMain: 'Primary phone',
    fPhoneSec: 'Secondary phone',
    fEmail: 'Email address',
    fAmount: 'Requested amount (USD)',
    fPropertyType: 'Property type for collateral',
    fSelect: 'Select',
    fHouse: 'House',
    fApartment: 'Apartment',
    fLand: 'Land',
    fCommercial: 'Commercial',
    fPropertySize: 'Property size',
    fFiscal: 'Fiscal property value (USD)',
    fLocation: 'Property location',
    fIncome: 'Estimated monthly income (USD)',
    fDebts: 'Current debts',
    fNotes: 'Additional comments',
    formSubmit: 'Send application',
    formSending: 'Sending application...',
    formSuccess: 'Application sent successfully. We will contact you soon.',
    formError: 'Could not send. Check data or server configuration.',
    testTitle: 'Testimonials',
    testText: 'Client stories highlighting speed and human support.'
  }
};

const testimonials = {
  es: [
    {
      text: 'Soy trabajador independiente y en los bancos me pedian demasiados papeles. Con Prestamos Jaguar me guiaron paso a paso y resolvi rapido.',
      name: 'Miguel A.'
    },
    {
      text: 'Tenia una oportunidad para mi negocio y necesitaba liquidez urgente. Me ofrecieron una tasa competitiva y un proceso mucho mas claro.',
      name: 'Patricia L.'
    },
    {
      text: 'Lo que mas valoro es que tratan con respeto a personas honestas que trabajan por cuenta propia. El papeleo fue minimo y todo transparente.',
      name: 'Jose R.'
    }
  ],
  en: [
    {
      text: 'I am self-employed and banks asked for too many documents. Prestamos Jaguar guided me step by step and solved my case quickly.',
      name: 'Miguel A.'
    },
    {
      text: 'I had a business opportunity and needed urgent liquidity. They offered a competitive rate and a much clearer process.',
      name: 'Patricia L.'
    },
    {
      text: 'What I value most is how they treat honest self-employed people with respect. Minimal paperwork and full transparency.',
      name: 'Jose R.'
    }
  ]
};

let currentLang = 'es';

const yearEl = document.getElementById('year');
const langToggle = document.getElementById('langToggle');
const track = document.getElementById('testimonialTrack');
const form = document.getElementById('loanForm');
const formStatus = document.getElementById('formStatus');

const calcBtn = document.getElementById('calcBtn');
const calcAmount = document.getElementById('calcAmount');
const calcRate = document.getElementById('calcRate');
const calcYears = document.getElementById('calcYears');
const monthlyResult = document.getElementById('monthlyResult');
const totalResult = document.getElementById('totalResult');
const interestResult = document.getElementById('interestResult');

function formatMoney(amount) {
  return new Intl.NumberFormat(currentLang === 'es' ? 'es-ES' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(amount);
}

function calculateLoan() {
  const principal = Number(calcAmount.value);
  const annualRate = Number(calcRate.value) / 100;
  const years = Number(calcYears.value);
  const n = years * 12;
  const monthlyRate = annualRate / 12;

  if (!principal || !annualRate || !years) {
    monthlyResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    interestResult.textContent = '$0.00';
    return;
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  const total = monthlyPayment * n;
  const interest = total - principal;

  monthlyResult.textContent = formatMoney(monthlyPayment);
  totalResult.textContent = formatMoney(total);
  interestResult.textContent = formatMoney(interest);
}

function renderTestimonials() {
  track.innerHTML = '';
  testimonials[currentLang].forEach((item) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.innerHTML = `<p>"${item.text}"</p><strong>${item.name}</strong>`;
    track.appendChild(card);
  });
}

function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = translations[currentLang][key];
    if (typeof text !== 'undefined') {
      el.textContent = text;
    }
  });

  langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
  renderTestimonials();
  calculateLoan();
}

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyTranslations();
});

calcBtn.addEventListener('click', calculateLoan);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.className = 'full form-status';
  formStatus.textContent = translations[currentLang].formSending;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/api/solicitud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.message || 'Error');
    }

    formStatus.classList.add('ok');
    formStatus.textContent = translations[currentLang].formSuccess;
    form.reset();
  } catch (error) {
    formStatus.classList.add('error');
    formStatus.textContent = `${translations[currentLang].formError} (${error.message})`;
  }
});

yearEl.textContent = new Date().getFullYear();
applyTranslations();
calculateLoan();
