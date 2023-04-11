import React, { KeyboardEvent, useCallback, useState } from 'react'
import { NextPage } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

interface Provider {
  id: string;
  name: string;
  type: string;
  [k: string]: string;
}

interface SigninPageProps {
  isLoggedIn: boolean;
  providers: Array<Provider>;
  csrfToken: string;
}


interface EmailInputProps {
  provider: Provider;
  onSuccess: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ provider, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = useCallback(async () => {
    setLoading(true);
    const res = await signIn('email', {
      email: email,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      if (res?.url) {
        window.location.replace(res.url);
      }
    } else {
      onSuccess(email);
    }
  }, [email, onSuccess]);

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSignin();
      }
    },
    [handleSignin]
  );

  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="e.g. jane.doe@company.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
      <button disabled={loading}>Next</button>
    </div>
  );
};

interface VerificationStepProps {
  email: string;
  callbackUrl?: string;
}

/**
 * User has inserted the email and now he can put the verification code
 */
export const VerificationStep: React.FC<VerificationStepProps> = ({
  email,
  callbackUrl,
}) => {
  const [code, setCode] = useState('');

  const onReady = useCallback(() => {
    window.location.href = `/api/auth/callback/email?email=${encodeURIComponent(
      email
    )}&token=${code}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ''}`;
  }, [callbackUrl, code, email]);

  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onReady();
      }
    },
    [onReady]
  );

  return (
    <div>
      <h2>Verify email</h2>
      <p>Insert the magic code you received on your email</p>
      <label>
        Magic code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={onKeyPress}
        />
      </label>

      <button onClick={onReady}>Go</button>
    </div>
  );
};

const SigninPage: NextPage<SigninPageProps> = ({ providers, isLoggedIn }) => {
  const { query } = useRouter();
  const { error } = query;
  const callbackUrl = 'https://your-website.com';

  const [email, setEmail] = useState('');
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const emailProvider = Object.values(providers).filter(
    (provider) => provider.type === 'email'
  );

  if (showVerificationStep) {
    return (
      <div>
        <VerificationStep email={email} callbackUrl={callbackUrl} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>Sign in wiht your email</h2>

        {emailProvider.map((provider) => (
          <EmailInput
            key={provider.id}
            provider={provider}
            onSuccess={(email) => {
              setEmail(email);
              setShowVerificationStep(true);
            }}
          />
        ))}
      </div>

      {/* {credentials} */}
    </div>
  );
};

SigninPage.getInitialProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  return {
    isLoggedIn: session !== null,
    providers: await getProviders(),
  } as unknown as SigninPageProps;
};

export default SigninPage;
