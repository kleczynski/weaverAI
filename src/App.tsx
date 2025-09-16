import { useState, useEffect, useRef } from 'react'
import './App.css'
import type { Dispatch, SetStateAction, TextareaHTMLAttributes } from 'react'
import logo from './assets/weaver_logo.png'
import removeBgLogo from './assets/weaver_logo-removebg-preview.png'

interface ApplicationData {
  description: string
  additionalDetails: string
  selectedFeatures: string[]
  brandGuidelines: string
}

type SetApplicationData = Dispatch<SetStateAction<ApplicationData>>

interface Step {
  id: number
  title: string
  isCompleted: boolean
  isActive: boolean
}

function AutoResizeTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { value, style, ...rest } = props
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      {...rest}
      ref={textareaRef}
      rows={1}
      style={{ ...style, overflow: 'hidden' }}
      value={value}
    />
  )
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    description: '',
    additionalDetails: '',
    selectedFeatures: [] as string[],
    brandGuidelines: ''
  })

  const steps: Step[] = [
    { id: 1, title: 'Application Details', isCompleted: currentStep > 1, isActive: currentStep === 1 },
    { id: 2, title: 'Features & Design', isCompleted: currentStep > 2, isActive: currentStep === 2 },
    { id: 3, title: 'Configuration', isCompleted: currentStep > 3, isActive: currentStep === 3 },
    { id: 4, title: 'Review', isCompleted: currentStep > 4, isActive: currentStep === 4 }
  ]

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src={logo} alt="Weaver AI" width={40} height={40} />
            </div>
            <span className="logo-text">Weaver AI</span>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="step-indicator">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className={`step-circle ${step.isCompleted ? 'completed' : step.isActive ? 'active' : 'inactive'}`}>
                {step.isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`step-title ${step.isActive ? 'active' : ''}`}>{step.title}</span>
              {index < steps.length - 1 && <div className={`step-connector ${step.isCompleted ? 'completed' : ''}`}></div>}
            </div>
          ))}
        </div>

        {currentStep === 1 && <ApplicationDetails data={applicationData} setData={setApplicationData} />}
        {currentStep === 2 && <FeaturesDesign data={applicationData} setData={setApplicationData} />}
        {currentStep === 3 && <Configuration data={applicationData} setData={setApplicationData} />}
        {currentStep === 4 && <Review data={applicationData} />}

        <div className="navigation">
          {currentStep > 1 && (
            <button className="back-btn" onClick={prevStep}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5m0 0L12 19m-7-7L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          )}
          <button className="continue-btn" onClick={nextStep}>
            {currentStep === 4 ? 'Generate My Application' : 
             currentStep === 3 ? 'Continue to Review' :
             currentStep === 2 ? 'Continue to Branding' : 'Continue to Features'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m0 0L12 5m7 7L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}

function ApplicationDetails({ data, setData }: { data: ApplicationData, setData: SetApplicationData }) {
  return (
    <div className="step-content">
        <img src={removeBgLogo} alt="Weaver AI" width={120} height={120}/>
      <h1>What Web Application would you like built?</h1>
      <p>Describe your vision and let our AI transform it into a fully functional web application. The more details you provide, the better we can tailor your app.</p>
      
      <div className="form-group">
        <label htmlFor="description">Application Description *</label>
        <AutoResizeTextarea
          id="description"
          value={data.description}
          onChange={(e) => setData({...data, description: e.target.value})}
          placeholder="Social Media Platform: User profiles, posts, comments, likes, and real-time messaging"
          maxLength={500}
        />
        <div className="char-count">
          <span>Minimum 50 characters</span>
          <span>{data.description.length}/500</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="details">Additional Details (Optional)</label>
        <AutoResizeTextarea
          id="details"
          value={data.additionalDetails}
          onChange={(e) => setData({...data, additionalDetails: e.target.value})}
          placeholder="Any specific features, integrations, or technical requirements? User roles, payment systems, third-party services, etc."
        />
      </div>

      <div className="inspiration-section">
        <div className="inspiration-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Need inspiration? Here are some optional examples:</span>
        </div>
        <p>Click any example below to automatically fill in your description, or write your own from scratch.</p>
        
        <div className="examples-grid">
          <div className="example-card" onClick={() => setData({...data, description: 'Online marketplace with product catalog, shopping cart, and payment processing'})}>
            <h3>E-commerce Store</h3>
            <p>Online marketplace with product catalog, shopping cart, and payment processing</p>
          </div>
          <div className="example-card" onClick={() => setData({...data, description: 'User profiles, posts, comments, likes, and real-time messaging'})}>
            <h3>Social Media Platform</h3>
            <p>User profiles, posts, comments, likes, and real-time messaging</p>
          </div>
          <div className="example-card" onClick={() => setData({...data, description: 'Course creation, student enrollment, progress tracking, and assessments'})}>
            <h3>Learning Management</h3>
            <p>Course creation, student enrollment, progress tracking, and assessments</p>
          </div>
          <div className="example-card" onClick={() => setData({...data, description: 'Analytics, reporting, data visualization, and team management tools'})}>
            <h3>Business Dashboard</h3>
            <p>Analytics, reporting, data visualization, and team management tools</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturesDesign({ data, setData }: { data: ApplicationData, setData: SetApplicationData }) {
  const features = [
    { id: 'weather', title: 'Add Weather Widget', description: 'Display current weather and forecasts', icon: '☁️' },
    { id: 'search', title: 'Add Smart Search', description: 'AI-powered search functionality', icon: '🔍', selected: true },
    { id: 'social', title: 'Add Social Engagement', description: 'Social sharing and interactions', icon: '👥' },
    { id: 'contact', title: 'Add Contact Form', description: 'Customizable contact and inquiry forms', icon: '✉️' },
    { id: 'news', title: 'Add Live News', description: 'Real-time news feeds and updates', icon: '📰' }
  ]

  const toggleFeature = (featureId: string) => {
    const currentFeatures = data.selectedFeatures || []
    if (currentFeatures.includes(featureId)) {
      setData({...data, selectedFeatures: currentFeatures.filter((id: string) => id !== featureId)})
    } else {
      setData({...data, selectedFeatures: [...currentFeatures, featureId]})
    }
  }

  return (
    <div className="step-content">
      <img src={removeBgLogo} alt="Weaver AI" width={120} height={120}/>
      <h1>Select Your Customizations</h1>
      <p>Choose the features you'd like to include in your application. You can always modify these later.</p>
      
      <div className="features-grid">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className={`feature-card ${data.selectedFeatures?.includes(feature.id) ? 'selected' : ''}`}
            onClick={() => toggleFeature(feature.id)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {data.selectedFeatures?.includes(feature.id) && (
              <div className="selected-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="currentColor"/>
                  <path d="M16 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Configuration({ data, setData }: { data: ApplicationData, setData: SetApplicationData }) {
  return (
    <div className="step-content">
      <img src={removeBgLogo} alt="Weaver AI" width={120} height={120}/>
      <h1>Brand Your Application</h1>
      <p>Upload your brand guidelines or provide a URL to ensure your application matches your brand identity.</p>
      
      <div className="brand-options">
        <div className="brand-option">
          <div className="brand-icon">📤</div>
          <h3>Upload PDF Guidelines</h3>
          <p>Upload your brand guidelines document (PDF format)</p>
          <button className="upload-btn">Click to upload PDF</button>
        </div>
        
        <div className="brand-option">
          <div className="brand-icon">🔗</div>
          <h3>Or Provide URL</h3>
          <p>Link to your online brand guidelines or style guide</p>
          <label htmlFor="guidelines-url">Guidelines URL</label>
          <input
            type="url"
            id="guidelines-url"
            value={data.brandGuidelines}
            onChange={(e) => setData({...data, brandGuidelines: e.target.value})}
            placeholder="https://your-brand-guidelines.com"
          />
        </div>
      </div>

      <div className="extraction-info">
        <h3>What we'll extract from your brand guidelines:</h3>
        <div className="extraction-items">
          <div className="extraction-item">
            <span className="extraction-icon">🎨</span>
            <span>Color Palette</span>
          </div>
          <div className="extraction-item">
            <span className="extraction-icon">Aa</span>
            <span>Typography</span>
          </div>
          <div className="extraction-item">
            <span className="extraction-icon">📐</span>
            <span>Layout Style</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Review({ data }: { data: ApplicationData }) {
  return (
    <div className="step-content">
      <img src={removeBgLogo} alt="Weaver AI" width={120} height={120}/>
      <h1>Review & Generate</h1>
      <p>Review your application configuration below and generate your custom web application.</p>
      
      <div className="review-sections">
        <div className="review-section">
          <div className="review-header">
            <span className="review-number">1</span>
            <h3>Application Description</h3>
          </div>
          <div className="review-content">
            <p><strong>Description:</strong></p>
            <p>{data.description || 'No description provided'}</p>
            {data.additionalDetails && (
              <>
                <p><strong>Additional Details:</strong></p>
                <p>{data.additionalDetails}</p>
              </>
            )}
          </div>
        </div>

        <div className="review-section">
          <div className="review-header">
            <span className="review-number">2</span>
            <h3>Selected Features</h3>
          </div>
          <div className="review-content">
            {data.selectedFeatures?.length > 0 ? (
              <div className="selected-features">
                {data.selectedFeatures.map((feature: string) => (
                  <span key={feature} className="feature-tag">{feature}</span>
                ))}
              </div>
            ) : (
              <p>No features selected</p>
            )}
          </div>
        </div>

        <div className="review-section">
          <div className="review-header">
            <span className="review-number">3</span>
            <h3>Brand Guidelines</h3>
          </div>
          <div className="review-content">
            <p>{data.brandGuidelines || 'No brand guidelines provided'}</p>
          </div>
        </div>
      </div>

      <div className="next-steps">
        <h3>What happens next?</h3>
        <div className="next-steps-grid">
          <div className="next-step">
            <div className="next-step-icon">⚡</div>
            <h4>AI Generation</h4>
            <p>Our AI will create your application based on your specifications</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">✅</div>
            <h4>Preview & Test</h4>
            <p>Review your application and test all features before deployment</p>
          </div>
          <div className="next-step">
            <div className="next-step-icon">🚀</div>
            <h4>Deploy</h4>
            <p>Launch your application with one click to your custom domain</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
