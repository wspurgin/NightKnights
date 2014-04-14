<?php

/**
* NightKnights Emailing interface
* Implements Swift mailer with STMP transport
*
* @author Will Spurgin
*/

require_once(__DIR__.'/../vendor/autoload.php');

class Mailer
{
    
    /**
    *
    * @param stmp_provider: string, stmp provider (i.e. 'stmp.google.com')
    * @param stmp_username: string, stmp username (i.e. 'john.doe@gmail.com')
    * @param stmp_password: string, stmp password
    * @param global_sender: string, default address for emails
    * @param global_alias: string, default alias for emails (i.e. 'John Doe')
    */
    public function __construct($smtp_host, $smtp_username, $smtp_pass, $global_sender=NULL, $global_alias=NULL)
    {
        $transport = Swift_SmtpTransport::newInstance($smtp_host, 587)
            ->setUsername($smtp_username)
            ->setPassword($smtp_pass)
        ;
        $transport->setEncryption('tls');
        $this->mailer = Swift_Mailer::newInstance($transport);
        $this->global_sender = $global_sender;
        $this->global_alias = $global_alias;
    }


    /**
    * 
    * @param email: SwiftMessage object with body, subject, from, and alias
    * @return result from SwiftMailer
    */
    public function send($email)
    {
        if(!is_a($email, 'Swift_Message'))
            throw new Exception("NK Mailer 'send' expects argument to be Swift_Message object.", 1);
        
        $result = $this->mailer->send($email);
        // $result = true;
        return $result;
    }

    /**
    * 
    * @return SwiftMessage with from and alias set to mailer globals
    */
    public function message()
    {
        return Swift_Message::newInstance()->setFrom(array(
            $this->global_sender => $this->global_alias)
        );
    }

    public function setGlobalSender($sender) { $this->global_sender = $sender; }

    public function setGlobalAlias($alias) { $this->global_alias = $alias; }

    public function getGlobalSender() { return $this->global_sender; }

    public function getGlobalAlias() { return $this->global_alias; }
}