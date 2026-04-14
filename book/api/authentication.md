# Authentication

All API requests must be authenticated. This page covers how integration
partners authenticate — for Console sign-in, see
[Access & Roles](../security/access-and-roles.md).

## API key authentication

Partner integrations authenticate using an API key provided by your I4G
liaison. Include the key in every request:

```http
X-API-KEY: <your-api-key>
```

Your API key is scoped to your organization and carries the permissions
of the role assigned to your integration account.

{% hint style="warning" %}
Keep your API key confidential. Do not commit it to source control or
share it in logs. If compromised, contact your liaison immediately for
rotation.
{% endhint %}

## Bearer token authentication

If your integration uses OAuth or receives a JWT from I4G's identity
layer, pass it as a bearer token:

```http
Authorization: Bearer <token>
```

Your I4G liaison will confirm which method applies to your integration.

## Roles and permissions

API keys are tied to an application role that determines which endpoints
you can access. See [Access & Roles](../security/access-and-roles.md)
for the full role hierarchy. Common partner roles:

| Role        | Typical use case                                     |
| ----------- | ---------------------------------------------------- |
| **User**    | Submit reports and check status                      |
| **Analyst** | Submit reports, query intelligence, download exports |
| **LEO**     | All analyst access plus law enforcement reports      |

## Error responses

| Status | Meaning                                                |
| ------ | ------------------------------------------------------ |
| `401`  | Missing or invalid credentials — check your API key    |
| `403`  | Valid credentials but insufficient role for the action |

## References

1. [IAM Technical Design](https://github.com/intelligenceforgood/core/blob/main/docs/design/iam.md)
   — full authentication architecture for developers.
